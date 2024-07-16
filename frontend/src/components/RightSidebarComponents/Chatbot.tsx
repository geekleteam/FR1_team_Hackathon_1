import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  variants: string[];
  type: 'text' | 'checkbox' | 'radio';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    variants: [
      "  🚀 What's the primary purpose of your application?",
      '  🎯 Can you describe the main goal of your app?',
      '  💡 What problem does your application aim to solve?',
    ],
    type: 'text',
  },
  {
    id: 2,
    variants: [
      '  💻 Choose your application interfaces:',
      '  🖥️ What platforms will your application support?',
      '  📱 On which devices will your app be accessible?',
    ],
    type: 'checkbox',
    options: ['Web app', 'Mobile app', 'Desktop app', 'API'],
  },
  {
    id: 3,
    variants: [
      '  📊 What type of data will your system primarily handle?',
      '  💾 What kind of information will your app process?',
      "  🗃️ What's the main type of data your system will manage?",
    ],
    type: 'text',
  },
  {
    id: 4,
    variants: [
      '  🔗 Select the external services you plan to integrate:',
      '  🌐 Which third-party services will your app use?',
      '  🤝 What external APIs or services will you connect to?',
    ],
    type: 'checkbox',
    options: [
      'Payment gateway',
      'Maps/Location services',
      'Email service',
      'Social media APIs',
      'Cloud storage',
      'Analytics',
    ],
  },
  {
    id: 5,
    variants: [
      "  📈 What's your expected initial user base size?",
      '  👥 How many users do you anticipate at launch?',
      "  🚀 What's the projected number of users for your initial release?",
    ],
    type: 'text',
  },
];

interface ChatbotProps {
  path: string;
}

export const Chatbot = ({ path }: ChatbotProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [inputValue, setInputValue] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentVariant, setCurrentVariant] = useState(0);
  const bottomElementRef = useRef<HTMLDivElement>(null);

  function combineQuestionsAndAnswers(questions: Question[], answers: { [key: number]: any }) {
    return {
      project_info: questions.map((question) => {
        const answer = answers[question.id - 1];
        return {
          id: question.id,
          question: question.variants[0], // Using the first variant
          type: question.type,
          ...(question.options && { options: question.options }),
          answer: answer,
        };
      }),
    };
  }

  const handleGenerateDiagram = async () => {
    try {
      let userResponse = combineQuestionsAndAnswers(questions, answers);

      const response = await fetch('/api/diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userResponse),
      });

      console.log(userResponse);

      const data = await response.json();
      // data.nodes.forEach((node: any) => {
      //   addNode(path, node);
      // });
      // data.edges.forEach((edge: any) => {
      //   addEdge(path, edge);
      // });
    } catch (error) {
      console.error('Error generating diagram:', error);
    }
  };

  useEffect(() => {
    if (currentQuestion < questions.length) {
      setTypedText('');
      setIsTyping(true);
      setCurrentVariant(Math.floor(Math.random() * questions[currentQuestion].variants.length));
      const text = questions[currentQuestion].variants[currentVariant];
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50); // Adjust typing speed here

      // Scroll to the bottom element after the question is displayed
      bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });

      return () => clearInterval(typingInterval);
    }
  }, [currentQuestion, currentVariant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: {
        ...prev[currentQuestion],
        [option]: !prev[currentQuestion]?.[option],
      },
    }));
  };

  const handleRadioChange = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isTyping && inputValue.trim()) {
      event.preventDefault(); // Prevent the default form submission
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (questions[currentQuestion].type === 'text') {
      setAnswers((prev) => ({ ...prev, [currentQuestion]: inputValue }));
      setInputValue('');
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleRepeatProcess = () => {
    setCurrentQuestion(0);
    setAnswers({});
  };

  const renderInput = () => {
    const question = questions[currentQuestion];
    switch (question.type) {
      case 'text':
        return (
          <div className="flex w-full mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-gray-700 text-white p-2 rounded-l-md focus:outline-none"
              placeholder="Type your answer..."
              disabled={isTyping}
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 focus:outline-none"
              disabled={isTyping || !inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        );
      case 'checkbox':
        return (
          <div className="mt-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={answers[currentQuestion]?.[option] || false}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2"
                  disabled={isTyping}
                />
                <label htmlFor={`checkbox-${index}`} className="text-white">
                  {option}
                </label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none mt-2"
              disabled={isTyping || Object.values(answers[currentQuestion] || {}).every((v) => !v)}
            >
              Next <ChevronRight size={20} className="inline" />
            </button>
          </div>
        );
      case 'radio':
        return (
          <div className="mt-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`radio-${index}`}
                  name={`question-${currentQuestion}`}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleRadioChange(option)}
                  className="mr-2"
                  disabled={isTyping}
                />
                <label htmlFor={`radio-${index}`} className="text-white">
                  {option}
                </label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none mt-2"
              disabled={isTyping || !answers[currentQuestion]}
            >
              Next <ChevronRight size={20} className="inline" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="generate-diagram-with-chat w-full flex items-center justify-center pb-64">
        <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-2xl mx-auto">
          {/* <h2 className="text-2xl font-bold mb-4">System Design Chat 🤖</h2> */}
          <div className="space-y-4">
            {questions.slice(0, currentQuestion + 1).map((question, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${index === currentQuestion ? 'bg-gray-800' : 'bg-gray-700'}`}
              >
                <p className="font-semibold">
                  {index === currentQuestion ? typedText : question.variants[0]}
                  {index === currentQuestion && isTyping && (
                    <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-blink"></span>
                  )}
                </p>
                {index === currentQuestion ? (
                  !isTyping && renderInput()
                ) : (
                  <p className="mt-2 text-green-400">
                    {question.type === 'checkbox'
                      ? Object.entries(answers[index] || {})
                          .filter(([_, value]) => value)
                          .map(([key]) => key)
                          .join(', ')
                      : answers[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
          {currentQuestion >= questions.length && (
            <>
              {/* <div className="my-4 p-1 text-primary-green border-[0.5px] border-white rounded-lg">
                <p className="font-semibold">Thank you for your input!</p>
              </div> */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={handleGenerateDiagram}
                  className="inline-block rounded bg-secondary-pink px-6 py-4 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-secondary-pink"
                >
                  Generate Diagram
                </button>
                {/* <button
                  onClick={handleRepeatProcess}
                  className="inline-block rounded border border-current px-6 py-2 text-sm font-medium text-primary-green transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-hovergreen"
                >
                  Repeat the Process
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>
      <div ref={bottomElementRef} id="bottomElement"></div>
    </>
  );
};
