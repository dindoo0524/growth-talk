"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage, ExperimentConfig, ChatStyle } from "@/lib/chat/types";
import { generateMockReply } from "@/lib/chat/mock-chat";
import { ChatBubble } from "./chat-bubble";
import { ChatInput } from "./chat-input";
import { StarterQuestions } from "./starter-questions";
import { StyleSelector } from "./style-selector";

interface ChatRoomProps {
  experiment: ExperimentConfig;
}

let messageCounter = 0;
function createId() {
  return `msg-${++messageCounter}-${Date.now()}`;
}

export function ChatRoom({ experiment }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [style, setStyle] = useState<ChatStyle>("iris");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, streamingText]);

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
    [experiment.id, style]
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
    },
    [messages, experiment, sendWithAI]
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-1 flex-col">
      {/* Style selector */}
      <StyleSelector style={style} onStyleChange={setStyle} />

      {/* Messages area */}
      <div ref={scrollRef} className="flex flex-1 flex-col overflow-y-auto">
        {!hasMessages ? (
          <StarterQuestions
            questions={experiment.starterQuestions}
            onSelect={sendMessage}
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
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
