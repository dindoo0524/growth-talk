import { growthTalkExperiment } from "./growth-talk";
import { spanishTutorExperiment } from "./spanish-tutor";
import type { ExperimentConfig } from "@/lib/chat/types";

export const experiments: Record<string, ExperimentConfig> = {
  "growth-talk": growthTalkExperiment,
  "spanish-tutor": spanishTutorExperiment,
};
