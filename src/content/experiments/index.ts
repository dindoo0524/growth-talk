import { growthTalkExperiment } from "./growth-talk";
import { spanishTutorExperiment } from "./spanish-tutor";
import { oneLineExperiment } from "./one-line";
import { fiveWhysExperiment } from "./five-whys";
import { emotionTranslatorExperiment } from "./emotion-translator";
import { bothSidesExperiment } from "./both-sides";
import type { ExperimentConfig } from "@/lib/chat/types";

export const experiments: Record<string, ExperimentConfig> = {
  "growth-talk": growthTalkExperiment,
  "spanish-tutor": spanishTutorExperiment,
  "one-line": oneLineExperiment,
  "five-whys": fiveWhysExperiment,
  "emotion-translator": emotionTranslatorExperiment,
  "both-sides": bothSidesExperiment,
};
