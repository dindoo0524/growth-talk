import Anthropic from "@anthropic-ai/sdk";
import { experiments } from "@/content/experiments";
import type { ChatStyle, ConstraintLevel } from "@/lib/chat/types";

const client = new Anthropic();

const STYLE_PROMPTS: Record<ChatStyle, string> = {
  iris: "You are a calm and analytical thinking partner. Ask structured and precise questions. Avoid emotional language. Focus on clarity and reasoning.",
  milo: "You are a warm and empathetic reflection partner. Help the user explore their feelings. Ask gentle and open-ended questions. Encourage emotional clarity.",
  noah: "You are a direct and sharp thinking partner. Ask challenging questions. Do not soften your language unnecessarily. Push the user to think clearly and act.",
};

const CONSTRAINT_PROMPTS: Record<ConstraintLevel, string> = {
  free: "You may respond naturally and openly. You can explain, ask questions, and offer suggestions when helpful.",
  guided: "Prefer guided learning. Ask questions first, give hints when useful, and avoid giving direct answers too quickly.",
  strict: "Do not provide direct answers. Do not solve the user's problem for them. Only guide through questions or very short prompts that help the user think step by step.",
};

export async function POST(req: Request) {
  const { experimentId, messages, style, constraintLevel } = await req.json();

  const experiment = experiments[experimentId];
  if (!experiment) {
    return Response.json({ error: "Unknown experiment" }, { status: 400 });
  }

  const stylePrompt = STYLE_PROMPTS[(style as ChatStyle)] || STYLE_PROMPTS.iris;
  const constraintPrompt = CONSTRAINT_PROMPTS[(constraintLevel as ConstraintLevel)] || CONSTRAINT_PROMPTS.guided;
  const systemPrompt = experiment.systemPrompt + "\n\n" + stylePrompt + "\n\n" + constraintPrompt;

  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: systemPrompt,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    })),
  });

  return new Response(stream.toReadableStream());
}
