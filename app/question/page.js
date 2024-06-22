'use client'

import React, { useState } from 'react';
import { QuestionContext } from '@/components/Question/QuestionContext';
import { Question } from '@/components/Question/Question';
import { Separator } from '@/components/ui/separator';

const TestPage = () => {
  const [currAnswer, setCurrAnswer] = useState(null);
  const showAnswer = false; // Set this to true if you want to show the answers

  const rowData = {
    context: [
      "Researcher Dr. Steven Gilbert, known for his extensive work on environmental health, has often stressed the intricate relationship between humans and their surroundings. While he acknowledges that the exact mechanism behind many health issues is not fully understood, he ___ that environmental factors, especially industrial pollutants, play a crucial role in the onset of certain diseases. His recent studies delve deep into the impact of pollution on both physical and mental health, revealing startling findings."
    ],
    images: [
      "https://hackercrunch-demo.s3.us-west-2.amazonaws.com/SAT+Test+3+1+Reading+Question+4.png"
    ],
    title: "Sample Question Title",
    choices: [
      "Choice A",
      "Choice B",
      "Choice C",
      "Choice D",
    ],
    number: 1,
    answer: "A",
    studentAnswer: 1, // assuming 1 is the letter B
    isCorrect: true,
    explanation: {
      correctAnswerExplanation: "<new>Imagine a classroom where students are working on various tasks. Each completed task earns points. Some tasks are simpler and earn 5 points each. Others are more involved and earn 15 points each. If a student completes a 5-point task, they earn 5 points. If they complete two of these tasks, they earn 10 points, and so on. We can represent the total points earned from the 5-point tasks as <latex>$5\\times \\text{number~of~5~point~tasks}$</latex>. In our equation, the number of 5-point tasks is represented by the variable <latex>${a}$</latex>.</new><new>Similarly, for the 15-point tasks, the total points earned can be represented as <latex>$5\\times \\text{number~of~5~point~tasks}$.</latex> Here, the number of 15-point tasks is represented by the variable <latex>${b}$</latex>. The total points for the project is 150. This total comes from a combination of the 5-point tasks and the 15-point tasks. So, the equation that sums up the total points from both types of tasks to equal 150 is: <latex>$\\text{5a + 15b = 150}$</latex>. Now, let's examine why the other options are incorrect:</new>",
      choiceOneExplanation: "<bigboldtext>Answer choice A</bigboldtext> is the correct answer. Please look at explanation on the very top.",
      choiceTwoExplanation: "<bigboldtext>Answer choice B</bigboldtext> is incorrect because <latex>$\\text{15a + 5b = 150}$</latex> suggests that the simpler tasks are worth 15 points and the more involved tasks are worth 5 points. However, this contradicts the information given.",
      choiceThreeExplanation: "<bigboldtext>Answer choice C</bigboldtext> is incorrect because <latex>$\\text{5a - 15b = 150}$</latex> suggests that completing a 15-point task actually takes away, or subtracts, 15 points from the total. This doesn't make logical sense because completing a task should add points, not subtract them.",
      choiceFourExplanation: "<bigboldtext>Answer choice D</bigboldtext> is incorrect because <latex>$\\text{5a + b = 150}$</latex> suggests that each of the more involved tasks is worth only 1 point, which is inconsistent with the given information that these tasks are worth 15 points each.",
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
            isBreakRoom={false}
            isMultipleChoice={true}
            isContextEmpty={
              !(
                (rowData.context.length > 0 &&
                  rowData.context[0] !== '') ||
                rowData.images.length > 0
              )
            }
            section={{ isBreakRoom: false }}
            handleSelectText={() => {}}
            highlights={[]}
            handleHighlightClick={() => {}}
            questionIndex={rowData.number - 1}
            isTestStarted
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
