import Anthropic from "@anthropic-ai/sdk";
import { experiments } from "@/content/experiments";

const client = new Anthropic();

export async function POST(req: Request) {
  const { experimentId, messages } = await req.json();

  const experiment = experiments[experimentId];
  if (!experiment) {
    return Response.json({ error: "Unknown experiment" }, { status: 400 });
  }

  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    system: experiment.systemPrompt,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    })),
  });

  return new Response(stream.toReadableStream());
}
