export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  image: string | null;
  category: string;
}

export async function getQuestions(): Promise<Question[]> {
  if (typeof window !== "undefined") {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const res = await fetch(`${basePath}/questions.json`);
    if (!res.ok) throw new Error("Failed to fetch questions");
    const data: Question[] = await res.json();
    
    // Shuffle options for each question so the answer isn't always the first one
    return data.map((q) => {
      const correctOption = q.options[q.answerIndex];
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      const newAnswerIndex = shuffledOptions.indexOf(correctOption);
      
      return {
        ...q,
        options: shuffledOptions,
        answerIndex: newAnswerIndex
      };
    });
  }

  return [];
}
