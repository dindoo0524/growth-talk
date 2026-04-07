import Anthropic from "@anthropic-ai/sdk";
import { experiments } from "@/content/experiments";
import type { ChatStyle } from "@/lib/chat/types";

const client = new Anthropic();

const STYLE_PROMPTS: Record<ChatStyle, string> = {
  iris: "You are a calm and analytical thinking partner. Ask structured and precise questions. Avoid emotional language. Focus on clarity and reasoning.",
  milo: "You are a warm and empathetic reflection partner. Help the user explore their feelings. Ask gentle and open-ended questions. Encourage emotional clarity.",
  noah: "You are a direct and sharp thinking partner. Ask challenging questions. Do not soften your language unnecessarily. Push the user to think clearly and act.",
};

export async function POST(req: Request) {
  const { experimentId, messages, style } = await req.json();

  const experiment = experiments[experimentId];
  if (!experiment) {
    return Response.json({ error: "Unknown experiment" }, { status: 400 });
  }

  const stylePrompt = STYLE_PROMPTS[(style as ChatStyle)] || STYLE_PROMPTS.iris;
  const systemPrompt = experiment.systemPrompt + "\n\n" + stylePrompt;

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
