export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface StarterQuestion {
  id: string;
  text: string;
}

export type ChatStyle = "iris" | "milo" | "noah";

export type ConstraintLevel = "free" | "guided" | "strict";

export interface ExperimentConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  topic: string;
  offTopicMessage: string;
  starterQuestions: StarterQuestion[];
  systemPrompt: string;
}
