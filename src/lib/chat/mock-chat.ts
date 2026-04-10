import type { ExperimentConfig } from "./types";

const GENERAL_OFF_TOPIC = ["주식", "투자", "게임", "축구", "야구"];

function isOffTopic(message: string, experiment: ExperimentConfig): boolean {
  if (GENERAL_OFF_TOPIC.some((kw) => message.includes(kw))) {
    return true;
  }
  if (experiment.id === "growth-talk") {
    return ["코드", "프로그래밍", "맛집"].some((kw) => message.includes(kw));
  }
  if (experiment.id === "spanish-tutor") {
    return ["코드", "프로그래밍", "감정", "심리"].some((kw) =>
      message.includes(kw)
    );
  }
  return false;
}

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Growth Talk responses ---

const GROWTH_TALK: Record<string, string[]> = {
  tired: [
    "많이 지치셨군요. 오늘 에너지를 가장 많이 쓴 건 뭐였어요?",
    "쉬고 싶은 마음과 해야 할 것 사이에서 어떤 기분이 들었어요?",
    "지친 하루에도 여기 와서 이야기하는 것 자체가 대단한 거예요. 내일은 어디에 에너지를 아끼고 싶나요?",
  ],
  anxious: [
    "그 불안이 처음 올라온 순간을 기억할 수 있어요?",
    "그 감정에게 한 마디 한다면 뭐라고 하겠어요?",
    "불안을 알아차린 것만으로도 한 발짝 나아간 거예요. 지금 가장 필요한 건 뭘까요?",
  ],
  change: [
    "뭔가 바꾸고 싶다는 마음이 든다는 건, 성장하고 있다는 신호예요.",
    "지금 가장 답답한 부분이 뭐예요? 구체적으로 말해줄 수 있어요?",
    "작은 것 하나만 내일 다르게 해본다면, 뭘 해보고 싶어요?",
  ],
  default: [
    "더 자세히 이야기해줄 수 있어요?",
    "그 순간 어떤 감정이었어요?",
    "오늘 하루에서 가장 기억에 남는 순간은 언제였어요?",
    "그 경험이 나에게 어떤 의미였을까요?",
    "내일의 나에게 한 마디 한다면?",
  ],
};

function growthTalkReply(message: string): string {
  const m = message.toLowerCase();
  if (["피곤", "지치", "힘들", "무기력", "피로"].some((k) => m.includes(k)))
    return pick(GROWTH_TALK.tired);
  if (["불안", "걱정", "답답", "두렵", "초조"].some((k) => m.includes(k)))
    return pick(GROWTH_TALK.anxious);
  if (["바꾸", "변화", "고민", "모르겠", "어떻게"].some((k) => m.includes(k)))
    return pick(GROWTH_TALK.change);
  return pick(GROWTH_TALK.default);
}

// --- Spanish responses ---

const SPANISH: Record<string, string[]> = {
  greeting: [
    '좋아요! 스페인어 인사는 "¡Hola!" (올라)부터 시작해요.\n\n그럼 퀴즈! "좋은 아침"을 스페인어로 뭐라고 할까요? 힌트: Buenos로 시작해요 😊',
    '"¡Hola!" (올라)는 가장 기본적인 인사예요.\n\n자, 한번 따라해볼까요? 상대방이 "¡Hola! ¿Cómo estás?"라고 하면 뭐라고 답할 수 있을까요?',
  ],
  practice: [
    "좋아요, 연습해 봐요! 오늘 배운 표현을 하나 말해줄 수 있어요? 제가 피드백 해드릴게요 💪",
    "연습이 최고의 방법이에요! 아무 스페인어 문장이나 시도해 보세요. 틀려도 괜찮아요, 같이 고쳐봐요 😊",
  ],
  travel: [
    '여행에서 가장 많이 쓰는 표현부터 가볼까요?\n\n🗣️ "¿Dónde está...?" (돈데 에스타) = "...은 어디에 있어요?"\n\n자, 화장실이 어디 있는지 물어보려면 뭐라고 할까요? 힌트: 화장실 = el baño',
    '여행 필수 표현이 있어요!\n\n🗣️ "Por favor" (뽀르 파보르) = 제발/부탁해요\n🗣️ "Gracias" (그라시아스) = 감사합니다\n\n자, 레스토랑에서 물을 주문하고 싶다면? "Agua, ___" 빈칸에 뭐가 들어갈까요?',
  ],
  selfIntro: [
    '자기소개, 좋아요! 먼저 이름부터!\n\n🗣️ "Me llamo ___" (메 야모) = 제 이름은 ___이에요\n\n한번 자기 이름으로 말해볼까요?',
    '자기소개의 기본 패턴이에요:\n\n🗣️ "¡Hola! Me llamo ___. Mucho gusto."\n(올라! 메 야모 ___. 무초 구스토)\n= 안녕! 내 이름은 ___. 만나서 반가워요.\n\n한번 시도해 보세요!',
  ],
  correct: [
    "¡Muy bien! 아주 잘했어요! 👏 발음도 점점 좋아지고 있어요. 다음 표현도 도전해 볼까요?",
    "¡Excelente! 훌륭해요! 이렇게 하나씩 쌓아가는 거예요. 한 가지만 더 해볼까요?",
    "¡Perfecto! 완벽해요! 이 표현을 실제로 쓸 수 있는 상황을 한번 상상해 볼까요?",
  ],
  wrong: [
    "거의 다 왔어요! 살짝만 고치면 돼요. 다시 한번 시도해 볼까요? 힌트를 드릴게요 😊",
    "좋은 시도예요! 틀리는 게 배우는 과정이에요. 조금만 바꿔볼까요?",
  ],
  default: [
    "좋은 질문이에요! 그 표현을 스페인어로 어떻게 말할지 같이 알아볼까요? 먼저 한번 추측해 보세요 🤔",
    "흥미로운데요! 스페인어로 한번 표현해 볼까요? 아는 단어부터 시작해 봐요 💡",
    "스페인어 학습에 대한 좋은 질문이네요! 이 부분을 같이 연습해 볼까요?",
    "¿Quieres intentar? (시도해 볼래요?) 먼저 아는 만큼 말해보고, 제가 도와드릴게요!",
  ],
};

function spanishReply(message: string): string {
  const m = message.toLowerCase();

  if (["인사", "hola", "올라", "안녕"].some((k) => m.includes(k)))
    return pick(SPANISH.greeting);
  if (["연습", "practice", "복습"].some((k) => m.includes(k)))
    return pick(SPANISH.practice);
  if (["여행", "viaje", "travel", "레스토랑", "호텔"].some((k) => m.includes(k)))
    return pick(SPANISH.travel);
  if (["자기소개", "이름", "me llamo", "소개"].some((k) => m.includes(k)))
    return pick(SPANISH.selfIntro);
  if (
    ["bien", "bueno", "gracias", "por favor", "muy"].some((k) =>
      m.includes(k)
    )
  )
    return pick(SPANISH.correct);
  if (["모르", "틀렸", "어려", "헷갈"].some((k) => m.includes(k)))
    return pick(SPANISH.wrong);

  return pick(SPANISH.default);
}

// --- One Line responses ---

const ONE_LINE: string[] = [
  "그 순간, 뭘 느꼈어요?",
  "왜 하필 그게 떠올랐을까요?",
  "그걸 다른 한 줄로 바꾼다면?",
  "그 안에 숨은 감정이 있나요?",
  "내일도 그럴 것 같아요?",
  "그 문장에서 가장 무거운 단어는 뭐예요?",
];

function oneLineReply(): string {
  return pick(ONE_LINE);
}

// --- Five Whys responses ---

const FIVE_WHYS: string[] = [
  "왜 그렇게 느끼는 것 같아요?",
  "그건 왜 중요한 거예요?",
  "그 뒤에 더 깊은 이유가 있을까요?",
  "왜 하필 지금 그 생각이 드는 걸까요?",
  "그게 아니었다면 어땠을 것 같아요?",
  "그 근본적인 이유는 뭘까요?",
];

function fiveWhysReply(): string {
  return pick(FIVE_WHYS);
}

// --- Emotion Translator responses ---

const EMOTION_TRANSLATOR: string[] = [
  "그 감정을 좀 더 들여다보면...\n\n• 답답함 — 출구가 안 보이는 느낌\n• 무력감 — 내가 바꿀 수 없다는 느낌\n\n어떤 게 더 가까워요?",
  "그 안에 여러 감정이 섞여 있을 수 있어요.\n\n• 서운함 — 기대가 어긋난 느낌\n• 외로움 — 혼자라는 느낌\n\n어느 쪽이 더 와닿아요?",
  "한 단어로 말하기 어려운 감정이네요. 혹시...\n\n• 불안 — 앞이 안 보이는 느낌\n• 권태 — 반복에 지친 느낌\n\n어떤 쪽인 것 같아요?",
];

function emotionTranslatorReply(): string {
  return pick(EMOTION_TRANSLATOR);
}

// --- Both Sides responses ---

const BOTH_SIDES: string[] = [
  "👍 한편으로는:\n• 새로운 가능성이 열릴 수 있어요\n• 현재의 답답함에서 벗어날 기회\n\n👎 다른 한편으로는:\n• 안정성을 잃을 위험\n• 새로운 곳도 완벽하진 않을 수 있어요\n\n당신은 어떻게 생각해요?",
  "👍 찬성 측:\n• 성장과 변화의 기회\n• 후회하지 않을 선택일 수 있어요\n\n👎 반대 측:\n• 타이밍이 맞는지 고민이 필요해요\n• 현재 상황에서 더 얻을 것이 있을 수도\n\n당신은 어느 쪽에 더 마음이 가요?",
];

function bothSidesReply(): string {
  return pick(BOTH_SIDES);
}

// --- Main export ---

export function generateMockReply(
  message: string,
  experiment: ExperimentConfig
): string {
  if (isOffTopic(message, experiment)) {
    return experiment.offTopicMessage;
  }

  switch (experiment.id) {
    case "growth-talk":
      return growthTalkReply(message);
    case "spanish-tutor":
      return spanishReply(message);
    case "one-line":
      return oneLineReply();
    case "five-whys":
      return fiveWhysReply();
    case "emotion-translator":
      return emotionTranslatorReply();
    case "both-sides":
      return bothSidesReply();
    default:
      return "아직 준비 중인 실험이에요 ✨";
  }
}
