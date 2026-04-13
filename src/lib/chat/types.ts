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

export type ExperimentCategory = "감정" | "사고" | "학습" | "기록";

export interface ChatSession {
  id: string;
  experimentId: string;
  messages: ChatMessage[];
  style: ChatStyle;
  constraintLevel: ConstraintLevel;
  createdAt: number;
  updatedAt: number;
}

export interface UserStats {
  totalSessions: number;
  totalMessages: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  experimentsUsed: string[];
}

export interface ExperimentConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: ExperimentCategory;
  topic: string;
  offTopicMessage: string;
  starterQuestions: StarterQuestion[];
  systemPrompt: string;
}
