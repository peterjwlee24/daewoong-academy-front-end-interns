'use client'

import React, { useState } from 'react';
import { QuestionContext } from '@/components/Question/QuestionContext';
import { Question } from '@/components/Question/Question';
import { Separator } from '@/components/ui/separator';
import { CSSEdit } from '@/components/TextEdit/CSSEdit';

const TestPage = () => {
  const [currAnswer, setCurrAnswer] = useState(null);
  const showAnswer = false; // Set this to true if you want to show the answers

  const rowData = {
    context: ["Sarah is planning a garden party and wants to rent chairs for her guests. The rental company charges a fixed fee of $40 and an additional $10 per hour for the rental. Sarah wants to rent the chairs for t hours and has a budget of $90 for the rental."],
    images: [],
    title: "Which inequality represents this situation?",
    choices: [
      "$$40t \\leq 90$$",
      "$$10t + 40 \\leq 90$$",
      "$$40 + 10t \\leq 90$$",
      "$$10 + 40t \\leq 90$$",
    ],
    number: 3,
    answer: "C",
    studentAnswer: 1, // assuming 1 is the letter B
    isCorrect: true,
    explanation: {
      correctAnswerExplanation: "<bigboldtext>To determine the correct inequality, follow these steps: </bigboldtext> <new>1. The total cost to rent the chairs consists of a fixed fee of $40 and a variable cost of $10 per hour.</new> <new>2. The inequality should represent the total cost being less than or equal to the maximum amount Sarah is willing to spend, which is $90.</new> <new><latex>$$\\text{Total Cost = }$$ $40 + 10t$</latex></latex></new> <new>Since Sarah wants to spend a maximum of $90, the inequality is:</new> <new><latex>$$40 + 10t \\leq 90$$</latex></new>",
      choiceOneExplanation: "<bigboldtext>Answer choice A</bigboldtext> is <bold>incorrect</bold> because the equation does not correctly represent the relationship between the total cost and the hours rented.",
      choiceTwoExplanation: "<bigboldtext>Answer choice B</bigboldtext> is <bold>incorrect</bold> because the equation does not correctly represent the relationship between the total cost and the hours rented.",
      choiceThreeExplanation: "<bigboldtext>Answer choice C</bigboldtext> is <bold>correct</bold> because the equation does correctly represent the relationship between the total cost and the hours rented.",
      choiceFourExplanation: "<bigboldtext>Answer choice D</bigboldtext> is <bold>incorrect</bold> because the equation does not correctly represent the relationship between the total cost and the hours rented.",
    },
  };


  const handleCurrAnswer = (newAnswer) => {
    setCurrAnswer(newAnswer);
  };

  const convertNumberToLetterQuestion = (number) => {
    return String.fromCharCode(65 + number); // 65 is the ASCII code for 'A'
  };

  return (
    <div className="flex flex-col h-screen">
      <Separator className="mt-4 h-[3px] bg-darkBlue" />
      <div className="overflow-y-auto flex-1 max-h-[70vh]">
        <div className="flex mx-4 gap-4 min-h-[100%]">
          <QuestionContext
            className="basis-1/2 mt-4"
            context={rowData.context}
            images={rowData.images}
          />

          <Separator
            className="h-auto w-[3px] bg-[#979797D1]"
            orientation="vertical"
          />
          <Question
            className="basis-1/2 mt-4"
            question={rowData}
            currQuestionIndex={rowData.number - 1}
            currAnswer={currAnswer}
            setCurrAnswer={handleCurrAnswer}
            currSectionIndex={0}
            checkedForReview={[]}
            toggleCheckedForReview={() => {}}
            isForReview={false}
            chosenAnswers={[]}
            setChosenAnswers={() => {}}
            handleChosenArray={() => {}}
            answerExplanation={rowData.explanation}
          />
        </div>
      </div>
      <Separator className="mb-4 h-[3px] bg-darkBlue" />
    </div>
  );
};

export default TestPage;