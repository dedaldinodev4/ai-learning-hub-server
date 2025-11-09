import type { IQuiz } from "@/types/quiz";
import { openai } from "../lib/openai";

type ISummary = {
  summary: string;
  quiz: IQuiz[];
}

export const generateTopicSummary = async (title: string, description?: string)
  : Promise<ISummary | Error> => {

  try {
    const prompt = `
        Gera um resumo e um pequeno quiz sobre o tema "${title}" 
        e descrição "${description || "N/A"}".
        O resumo deve ter no máximo 100 palavras.
        O quiz deve ter 5 perguntas e respostas objetivas sobre o tema.
  
        Retorna em JSON no seguinte formato:
        {
          "summary": "...",
          "quiz": [
            { "question": "...", "answer": "..." },
            { "question": "...", "answer": "..." },
            { "question": "...", "answer": "..." }
            { "question": "...", "answer": "..." }
            { "question": "...", "answer": "..." }
          ]
        }
      `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message?.content ?? "";
    const result = JSON.parse(content);

    return {
      summary: result.summary,
      quiz: result.quiz,
    };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}