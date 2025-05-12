interface QuizCardProps {
    quizCard: string;
}

const parseQuizCards = (quizCard: string) => {
    const cards: {question: string, choices: string, answer: string} [] = [];
    const lines = quizCard.split("\n").map((line) => line.trim());
    let currentQuestion = "";
    let currentChoices = "";
    let currentAnswer = "";

    //Process each line and build quiz cards
    for(const line of lines) {
        if(line.startsWith("- Question:")){
            if (currentQuestion && currentChoices && currentAnswer){
                cards.push({question: currentQuestion, choices: currentChoices, answer: currentAnswer});
                currentChoices="";
            }
            currentQuestion = line.replace("- Question:", "").trim();
        } else if(line.startsWith("- Choices:")){
            currentChoices = line.replace("- Choices:", "").trim();
        } else if(line.startsWith("- Answer:")){
          currentAnswer = line.replace("- Answer:", "").trim();
        }
    }

    if(currentQuestion && currentChoices) {
        cards.push({question: currentQuestion, choices: currentChoices, answer: currentAnswer});
    }

    return cards;
};

const QuizCard = ({quizCard}: QuizCardProps) => {
    const quizCards = parseQuizCards(quizCard);

    return (
        <div className="card">
          <div className="card-header">Quiz Cards</div>
          <div className="card-body">
            {quizCards.length > 0 ? (
              <div className="row">
                {quizCards.map((card, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Q: {card.question}</h5>
                        <p className="card-text">
                          A: {card.choices}
                        </p>
                        <p className="card-text">
                          {card.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ whiteSpace: "pre-wrap" }}>{quizCard}</p>
            )}
          </div>
        </div>
      );
}

export default QuizCard;