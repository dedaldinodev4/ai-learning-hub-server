import { openai } from "../lib/openai";

export const generateTopicSummary = async (title: string, description?: string)
  : Promise<string> => {
  const prompt = `
  Summarize this topic in 2-3 sentences and suggest 3 learning resources (books, videos or articles):
  Title: ${title}
  Description: ${description || "N/A"}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message?.content?.trim()!;
}