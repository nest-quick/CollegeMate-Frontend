import { useCallback, useState } from "react";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { generateSlides } from "../lib/slidesApi";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_AI_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

type Mode = "Quiz" | "Flashcards" | "Slides";

const prompts: Record<Mode, string> = {
  Quiz: `Turn the following lecture notes into quiz questions and choices.

  Format like this:
  - Question: (write a question)
  - Choices: (write 4 choices, only one choice should be correct)
  - Answer: (write answer here)

  Notes:\n\n`,
  
  Flashcards: `Turn the following lecture notes into flashcards.

  Format like this:
  - Question: (write a question)
  - Answer: (write the answer)

  Notes:\n\n`,

  Slides: `Convert the following notes into a slide deck outline.
          
                            Format:
                                {
                                "title": "string",
                                "slides": [
                                    {
                                    "title": "string",
                                    "bullets": [
                                        "string"
                                    ]
                                    }
                                ]
                                }

                            Only return the JSON array. Do not add explanations.
                            
                            Notes:\n\n`,

};

export const useGenerateContent = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const resetContent = useCallback(()=> {
    setContent("");
  }, []);

  const handleGenerateContent = async (text: string, mode: Mode) => {
    setLoading(true);
    setContent("");

    try {
      //Create Azure AI Inference client
      const client = ModelClient(
        endpoint,
        new AzureKeyCredential(GITHUB_TOKEN)
      );

      //Send request to model for chat completion
      const response = await client.path("/chat/completions").post({
        body: {
          model,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that creates ${mode.toLowerCase()} from notes.",
            },
            {
              role: "user",
              content: `${prompts[mode]}${text}`,
            },
          ],
          temperature: 0.7,
          top_p: 1,
        },
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      //Extract generated summary from model response
      const result = response.body.choices?.[0]?.message?.content || "Content not available";

      if(mode === "Slides"){
        const structuredSlides = JSON.parse(result || "[]");
        const {url} = await generateSlides({
            title: "AI Generated Slides", 
            slides: structuredSlides,
        });
        setContent(url);
      } else {
      setContent(result.trim());
      }
    } catch (error) {
      console.error("Error:", error);
      setContent("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {content, loading, handleGenerateContent, resetContent};
};