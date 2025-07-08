import { mistral } from "@ai-sdk/mistral";
import { streamObject } from "ai";
import { z } from "zod";

export const runtime = "edge";

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    ),
    steps: z.array(z.string()),
  }),
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const model = mistral("mistral-large-latest");
  const system =
    "You are a professional chef. When asked for a recipe, you provide the exact ingredients and the amount needed to cook it. You also show the steps to use the ingredients and cook the food until the final output.";
  const result = await streamObject({
    model,
    schema,
    prompt,
    system,
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const partial of result.partialObjectStream) {
          controller.enqueue(
            new TextEncoder().encode(JSON.stringify(partial) + "\n")
          );
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-store",
    },
  });
}
