interface FlashCardProps {
  flashCard: string;
}

// Helper function to parse flashcards
const parseFlashcards = (flashCard: string) => {
  const cards: { question: string; answer: string }[] = [];
  const lines = flashCard.split("\n").map((line) => line.trim());
  let currentQuestion = "";
  let currentAnswer = "";

  //Process each line and build flashcards
  for (const line of lines) {
    if (line.startsWith("- Question:")) {
      if (currentQuestion && currentAnswer) {
        cards.push({ question: currentQuestion, answer: currentAnswer });
        currentAnswer = "";
      }
      currentQuestion = line.replace("- Question:", "").trim();
    } else if (line.startsWith("- Answer:")) {
      currentAnswer = line.replace("- Answer:", "").trim();
    }
  }

  //Push flashcard if it exists
  if (currentQuestion && currentAnswer) {
    cards.push({ question: currentQuestion, answer: currentAnswer });
  }

  return cards;
};

//Render Flashcards
const FlashCard = ({ flashCard }: FlashCardProps) => {
  const flashcards = parseFlashcards(flashCard);

  return (
    <div className="card">
      <div className="card-header">Flashcards</div>
      <div className="card-body">
        {flashcards.length > 0 ? (
          <div className="row">
            {flashcards.map((card, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Q: {card.question}</h5>
                    <p className="card-text">
                      <strong>A:</strong> {card.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ whiteSpace: "pre-wrap" }}>{flashCard}</p>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
