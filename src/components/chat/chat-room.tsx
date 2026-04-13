"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage, ChatSession, ExperimentConfig, ChatStyle, ConstraintLevel } from "@/lib/chat/types";
import { generateMockReply } from "@/lib/chat/mock-chat";
import { saveSession, getSessionsByExperiment, recordActivity } from "@/lib/chat/storage";
import { ChatBubble } from "./chat-bubble";
import { ChatInput } from "./chat-input";
import { StarterQuestions } from "./starter-questions";
import { StyleSelector } from "./style-selector";
import { ConstraintSelector } from "./constraint-selector";
import { ChatHistory } from "./chat-history";

interface ChatRoomProps {
  experiment: ExperimentConfig;
}

let messageCounter = 0;
function createId() {
  return `msg-${++messageCounter}-${Date.now()}`;
}

function createSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatRoom({ experiment }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState(createSessionId);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [style, setStyle] = useState<ChatStyle>("iris");
  const [constraintLevel, setConstraintLevel] = useState<ConstraintLevel>("guided");
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingText]);

  // Auto-save session to localStorage when messages change
  useEffect(() => {
    if (messages.length === 0) return;
    const session: ChatSession = {
      id: sessionId,
      experimentId: experiment.id,
      messages,
      style,
      constraintLevel,
      createdAt: messages[0].timestamp,
      updatedAt: Date.now(),
    };
    saveSession(session);
  }, [messages, sessionId, experiment.id, style, constraintLevel]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setSessionId(createSessionId());
    setStreamingText("");
    setIsTyping(false);
  }, []);

  const loadSession = useCallback((session: ChatSession) => {
    setMessages(session.messages);
    setSessionId(session.id);
    setStyle(session.style);
    setConstraintLevel(session.constraintLevel);
    setShowHistory(false);
  }, []);

  const sendWithAI = useCallback(
    async (content: string, allMessages: ChatMessage[]) => {
      const apiMessages = allMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            experimentId: experiment.id,
            messages: apiMessages,
            style,
            constraintLevel,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let fullText = "";

        setStreamingText("");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("event: content_block_delta")) continue;
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === "content_block_delta" && data.delta?.text) {
                  fullText += data.delta.text;
                  setStreamingText(fullText);
                }
              } catch {
                // skip non-JSON lines
              }
            }
          }
        }

        return fullText || null;
      } catch {
        return null;
      }
    },
    [experiment.id, style, constraintLevel]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg: ChatMessage = {
        id: createId(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsTyping(true);
      setStreamingText("");

      const aiReply = await sendWithAI(content, updatedMessages);
      const replyText = aiReply || generateMockReply(content, experiment);

      const assistantMsg: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: replyText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      setStreamingText("");

      // Record activity for streak
      recordActivity(experiment.id, 2);
    },
    [messages, experiment, sendWithAI]
  );

  const hasMessages = messages.length > 0;
  const pastSessions = getSessionsByExperiment(experiment.id);
  const hasPastSessions = pastSessions.length > 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-2">
        <StyleSelector style={style} onStyleChange={setStyle} />
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {hasPastSessions && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-white/30 border border-(--color-border) hover:text-white/60 hover:border-white/20 transition-all"
            >
              {showHistory ? "닫기" : `기록 ${pastSessions.length}`}
            </button>
          )}
          {hasMessages && (
            <button
              onClick={resetChat}
              className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium text-white/30 border border-(--color-border) hover:text-white/60 hover:border-white/20 transition-all"
            >
              새 대화
            </button>
          )}
        </div>
      </div>
      <ConstraintSelector level={constraintLevel} onLevelChange={setConstraintLevel} />

      {/* History panel */}
      {showHistory && (
        <ChatHistory
          sessions={pastSessions}
          currentSessionId={sessionId}
          onSelect={loadSession}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Messages area */}
      {!showHistory && (
        <>
          <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
            {!hasMessages ? (
              <StarterQuestions
                questions={experiment.starterQuestions}
                onSelect={sendMessage}
                daily
              />
            ) : (
              <div className="flex flex-col gap-3 pb-4">
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="rounded-2xl rounded-bl-md bg-white/8 px-4 py-3 text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                      {streamingText || (
                        <span className="inline-flex gap-1 text-white/40">
                          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </>
      )}
    </div>
  );
}
