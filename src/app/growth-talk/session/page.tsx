"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SessionStep } from "@/lib/growth-talk/session-types";
import { useSession } from "@/components/growth-talk/use-session";
import { SessionIntro } from "@/components/growth-talk/session-intro";
import { QuestionCard } from "@/components/growth-talk/question-card";
import { AnswerInput } from "@/components/growth-talk/answer-input";

export default function SessionPage() {
  const router = useRouter();
  const {
    state,
    startSession,
    answerQuestion,
    currentQuestion,
    currentQuestionIndex,
    isComplete,
  } = useSession();

  useEffect(() => {
    if (isComplete) {
      router.push("/growth-talk/result");
    }
  }, [isComplete, router]);

  if (state.step === SessionStep.INTRO) {
    return <SessionIntro onStart={startSession} />;
  }

  if (currentQuestion) {
    return (
      <div className="flex flex-1 flex-col justify-center">
        {/* Progress bar */}
        <div className="mb-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= currentQuestionIndex
                  ? "bg-(--color-accent)"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="animate-fade-in">
          <QuestionCard
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={3}
            questionText={currentQuestion.text}
          />
          <AnswerInput
            key={currentQuestion.id}
            onSubmit={answerQuestion}
            isLast={state.step === SessionStep.Q3}
          />
        </div>
      </div>
    );
  }

  return null;
}
