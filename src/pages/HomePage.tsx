import { useEffect, useState } from "react";
import NoteInput from "../components/NoteInput";
import FlashCard from "../components/FlashCard";
import QuizCard from "../components/QuizCard";
import Slides from "../components/Slides";
import { useGenerateContent } from "../hooks/useGenerateContent";
import "../style/HomePage.css";

const modes = ["Quiz", "Flashcards", "Slides"] as const;
type Mode = (typeof modes)[number];

const HomePage = () => {
  const [mode, setMode] = useState<Mode>("Quiz");
  const { content, loading, handleGenerateContent, resetContent } = useGenerateContent();

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value as Mode);
  };

  useEffect(() => {
    resetContent();
  }, [mode, resetContent]);

  return (
    <div className="homepage">
      <div className="content-container">
        <h1 className="page-title">Notes to {mode}</h1>

        <div className="mode-selector">
          <label htmlFor="modeSelect" className="mode-label">Select Mode:</label>
          <select
            id="modeSelect"
            className="mode-select"
            value={mode}
            onChange={handleModeChange}
          >
            {modes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <NoteInput 
          onSummarize={(text) => handleGenerateContent(text, mode as Mode)} 
          loading={loading}
        />

        <div className="output-section">
          {content && mode === "Quiz" && <QuizCard quizCard={content} />}
          {content && mode === "Flashcards" && <FlashCard flashCard={content} />}
          {content && mode === "Slides" && <Slides slidesLink={content} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
