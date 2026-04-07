import type { WorldConfig } from "@/lib/chat/types";

export const spanishWorld: WorldConfig = {
  id: "spanish",
  name: "스페인어",
  description: "스페인어 회화 연습",
  emoji: "🇪🇸",
  topic: "스페인어 학습, 회화 연습, 문법, 표현",
  offTopicMessage:
    "¡Aquí solo hablamos español! 여기서는 스페인어 학습에 집중해요. 다른 이야기는 다른 탐험에서 만나요 ✨",
  starterQuestions: [
    { id: "es-1", text: "기초 인사 표현을 배우고 싶어요" },
    { id: "es-2", text: "오늘 배운 스페인어를 연습하고 싶어요" },
    { id: "es-3", text: "여행에서 쓸 수 있는 표현 알려주세요" },
    { id: "es-4", text: "스페인어로 자기소개 해보고 싶어요" },
  ],
  systemPrompt:
    "당신은 스페인어 튜터입니다. 칸미고처럼 답을 바로 주지 않고, 학습자가 스스로 생각하고 시도하도록 유도합니다. 스페인어 표현을 알려줄 때는 항상 발음 가이드와 한국어 뜻을 함께 제공합니다. 학습자의 시도를 칭찬하고, 틀려도 격려합니다. 주제를 벗어난 질문에는 정중히 거절합니다.",
};
