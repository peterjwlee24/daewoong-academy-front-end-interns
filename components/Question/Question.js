import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CSSEdit } from '@/components/TextEdit/CSSEdit'

import 'katex/dist/katex.min.css';
import LatexComponent from 'react-latex-next';

export const Latex = ({ children }) => {
  console.log(children);
  return <LatexComponent>{children}</LatexComponent>;
};

import {
  studentAnserconvertLetterToNumber,
  answerBannerMsg,
  frqAnswerBannerMsg,
  answerConvertNumberToLetterQuestion,
} from '@/lib/utils'
import {
  DisplayAddorDeleteEliminationIcon,
  EliminationTool,
  EliminationText,
  HideElimination,
  findQuestion,
  addEliminationObject,
  handleDisplayHideFun,
} from '@/components/Question/EliminationTool'
import { ToggleProvider } from '../../lib/ToggleContext'
import { eliminationStateObj } from '@/lib/utils'

export const Question = ({
  className = '',
  question,
  currQuestionIndex,
  currAnswer,
  setCurrAnswer,
  isTestReport,
  answer,
  studentAnswer,
  isCorrect,
  currSectionIndex,
  checkedForReview,
  toggleCheckedForReview,
  isForReview,
  chosenAnswers,
  setChosenAnswers,
  isForConcpetQuestionPractice,
  isForConcpetQuestionPracticeShowAnswer,
  answerExplanation,
  handleChosenArray,
}) => {
  const [isElimationOn, setIsElimationOn] = useState(false)
  const [hideElimation, setHideElimation] = useState(false)
  const [eliminationState, setEliminationState] = useState(eliminationStateObj)
  const [currentIndex, setCurrentIndex] = useState(currSectionIndex)
  const [previousIndex, setPreviousIndex] = useState(null)

  let answerChoiceArray = ['A', 'B', 'C', 'D']
  currSectionIndex = currSectionIndex ? currSectionIndex : 0
  isForConcpetQuestionPractice = isForConcpetQuestionPractice
    ? isForConcpetQuestionPractice
    : false
  const answerStyle = (isCorrect, answer) => {
    if (
      isCorrect === 'Omitted' ||
      _.isUndefined(answer) ||
      _.isNull(answer) ||
      _.isEmpty(answer)
    ) {
      return `p-4 bg-yellow-400 mb-8 mt-8 rounded-md`
    }
    if (isCorrect) {
      return `p-4 bg-green-400 mb-8 mt-8 rounded-md`
    }
    if (!isCorrect) {
      return `p-4 bg-red-400 mb-8 mt-8 rounded-md`
    }
  }

  useEffect(() => {
    if (currentIndex !== previousIndex) {
      setEliminationState(eliminationStateObj)
    }
    setPreviousIndex(currSectionIndex)
  }, [currentIndex, previousIndex, currSectionIndex])

  function handleElimationOnOrOff(elimationOnOrOff) {
    if (!elimationOnOrOff) {
      setHideElimation(false)
    }
    setIsElimationOn(elimationOnOrOff)
  }

  function handleElimationHideOrShow(hideElimation) {
    setHideElimation(hideElimation)
  }

  function updateEliminationObject(currQuestionIndex, eliminationChoice) {
    return setEliminationState((prevArray) => {
      return prevArray.map((question) => {
        if (question.id === currQuestionIndex) {
          return {
            ...question,
            [eliminationChoice]: !question[eliminationChoice],
          }
        }
        return question
      })
    })
  }

  function handleAddDelete(index, currQuestionIndex) {
    if (!_.isNil(eliminationState)) {
      const eliminationChoice = answerConvertNumberToLetterQuestion(index)
      const question = findQuestion(eliminationState, currQuestionIndex)

      if (_.isEmpty(question) || _.isUndefined(question)) {
        setEliminationState((prevArray) => [
          ...prevArray,
          addEliminationObject(currQuestionIndex, eliminationChoice),
        ])
      } else {
        updateEliminationObject(currQuestionIndex, eliminationChoice)
      }

      // Check if the selected choice is being eliminated
      if (currAnswer === index) {
        // Deselect the answer if it is being eliminated
        setCurrAnswer(null)

        // Update chosenAnswers to reflect the deselection
        if (
          chosenAnswers !== null &&
          chosenAnswers !== undefined &&
          Array.isArray(chosenAnswers)
        ) {
          console.log('the chosen answer has content')
          const updatedChosenAnswers = [...chosenAnswers]
          updatedChosenAnswers[currSectionIndex][currQuestionIndex] = null
          setChosenAnswers(updatedChosenAnswers)
        }
      }
    }
  }

  function isEliminationAdded(index) {
    if (!_.isNil(eliminationState[0])) {
      const eliminationChoice = answerConvertNumberToLetterQuestion(index)
      const question = findQuestion(eliminationState, currQuestionIndex)
      if (!_.isEmpty(question) && !_.isUndefined(question)) {
        if (!isElimationOn) {
          return true
        }
        return question[0][eliminationChoice]
      }
      return 'undefined'
    }
  }

  return (
    <div className={(cn('w-full space-y-4'), className)}>
      <div className="flex justify-between">
        <div className="w-fit py-1 px-2 mb-2 rounded-md bg-[#EAEAEA] flex ">
          <p className="text-xl font-medium text-slate-700">
            Q {currQuestionIndex + 1}
          </p>
        </div>
        {!isForReview && !isForConcpetQuestionPractice && (
          <div className="flex space-x-4">
            {isElimationOn && (
              <ToggleProvider>
                <HideElimination
                  handleElimationHideOrShow={handleElimationHideOrShow}
                />
              </ToggleProvider>
            )}
            <ToggleProvider>
              <EliminationTool
                handleElimationOnOrOff={handleElimationOnOrOff}
              />
            </ToggleProvider>
            <div className="flex items-center">
              <Switch
                id="mark-for-review-toggle"
                onClick={() =>
                  toggleCheckedForReview(currSectionIndex, currQuestionIndex)
                }
                color="red"
                checked={
                  checkedForReview
                    ? checkedForReview.length > 0
                      ? checkedForReview[currSectionIndex][currQuestionIndex]
                      : false
                    : false
                }
              />
              <Label htmlFor="mark-for-toggle">Mark For Review</Label>
            </div>
          </div>
        )}
      </div>
      <div className="w-[98%] mb-6">
        <Latex>{question.title}</Latex>
      </div>
      {false ? (
        <>
          {isTestReport ? (
            <div>
              <Textarea
                type="text"
                placeholder="Answer..."
                value={studentAnswer}
                className="border border-gray-800 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
              <div className={answerStyle(isCorrect, studentAnswer)}>
                <span className="text-xl text-white">
                  {frqAnswerBannerMsg(isCorrect, answer)}
                </span>
              </div>
              <div className="mb-4 mt-6">
                <span className="text-2xl font-bold">Explanation</span>
              </div>
              <div className="mb-4">
                {/*Need to Modify Explanation Section */}
                <CSSEdit
                  textString={answerExplanation.correctAnswerExplanation}
                />
                <CSSEdit textString={answerExplanation.choiceOneExplanation} />
              </div>
            </div>
          ) : (
            <Textarea
              type="text"
              placeholder="Answer..."
              value={currAnswer}
              onChange={(event) => {
                setCurrAnswer(event.target.value)
              }}
              className="border border-gray-400 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          )}
        </>
      ) : (
        <div>
          {isForConcpetQuestionPracticeShowAnswer ? (
            <>
              {question.choices.map((choice, index) => {
                let studentAnswerNumber
                if (isTestReport) {
                  studentAnswerNumber =
                    studentAnserconvertLetterToNumber(studentAnswer)
                }
                return (
                  <div
                    key={index}
                    className={`p-4 mb-4 box-border border rounded disabled ${
                      currAnswer === index || studentAnswerNumber === index
                        ? 'bg-lightSkyBlue border-2 border-darkBlue'
                        : 'bg-white text-gray-900 p-[17px] border-1 border-gray-800'
                    } `}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center rounded-full border mr-4 ${
                          currAnswer === index
                            ? 'bg-darkBlue border-darkBlue'
                            : 'bg-white border-black'
                        }`}
                      >
                        <div className="w-8 h-8">
                          <p
                            className={`font-bold text-center align-middle leading-8 select-none ${
                              currAnswer === index ? 'text-white' : 'text-black'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </p>
                        </div>
                      </div>
                      {choice.startsWith('http') ? (
                        <Image
                          src={choice}
                          width={200}
                          height={200}
                          alt={choice}
                          style={{
                            height: 'auto',
                          }}
                          key={index}
                          className="select-none"
                        />
                      ) : (
                        <>
                          <Latex>{choice}</Latex>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <>
              {question.choices.map((choice, index) => {
                let studentAnswerNumber
                if (isTestReport) {
                  studentAnswerNumber =
                    studentAnserconvertLetterToNumber(studentAnswer)
                }

                const hideChoice = handleDisplayHideFun(
                  index,
                  eliminationState,
                  currQuestionIndex,
                )

                let hide
                if (hideElimation && hideChoice) {
                  hide = true
                } else {
                  hide = false
                }

                return (
                  !hide && (
                    <div key={index} className="flex flex-row space-x-6">
                      <div className="flex items-center">
                        <div
                          className={
                            isElimationOn &&
                            'hover:bg-blue-200 rounded-full p-2'
                          }
                          onClick={() =>
                            isElimationOn &&
                            handleAddDelete(index, currQuestionIndex)
                          }
                        >
                          <ToggleProvider>
                            {isElimationOn && (
                              <DisplayAddorDeleteEliminationIcon
                                currQuestionIndex={currQuestionIndex}
                                index={index}
                                eliminationState={eliminationState}
                              />
                            )}
                          </ToggleProvider>
                        </div>
                      </div>
                      <div
                        key={index}
                        className={`w-[100%] p-4 mb-4 box-border border rounded cursor-pointer ${
                          (currAnswer === index ||
                            studentAnswerNumber === index) &&
                          isEliminationAdded(index)
                            ? 'bg-lightSkyBlue border-2 border-darkBlue'
                            : 'bg-white text-gray-900 p-[17px] border-1 border-gray-800'
                        } `}
                        onClick={() => {
                          !isTestReport &&
                            isEliminationAdded(index) &&
                            setCurrAnswer((prevSelected) =>
                              prevSelected === index ? null : index,
                            )
                          if (typeof handleChosenArray === 'function') {
                            console.log('handleChosenArray is a function')
                            handleChosenArray((prev) => {
                              prev[currSectionIndex][index] = null
                              return prev
                            })
                          }
                        }}
                      >
                        <div className="flex items-center">
                          <div
                            className={`flex items-center justify-center rounded-full border mr-4 ${
                              currAnswer === index && isEliminationAdded(index)
                                ? 'bg-darkBlue border-darkBlue'
                                : 'bg-white border-black'
                            }`}
                          >
                            <div className="w-8 h-8">
                              <p
                                className={`font-bold text-center align-middle leading-8 select-none ${
                                  currAnswer === index &&
                                  isEliminationAdded(index)
                                    ? 'text-white'
                                    : 'text-black'
                                }`}
                              >
                                {choice.startsWith('http') ? (
                                  <EliminationText
                                    isElimationOn={isElimationOn}
                                    eliminationState={eliminationState}
                                    currQuestionIndex={currQuestionIndex}
                                    index={index}
                                  >
                                    {String.fromCharCode(65 + index)}
                                  </EliminationText>
                                ) : (
                                  String.fromCharCode(65 + index)
                                )}
                              </p>
                            </div>
                          </div>
                          {choice.startsWith('http') ? (
                            <Image
                              src={choice}
                              width={200}
                              height={200}
                              alt={choice}
                              style={{
                                height: 'auto',
                              }}
                              key={index}
                              className="select-none"
                            />
                          ) : (
                            <EliminationText
                              isElimationOn={isElimationOn}
                              eliminationState={eliminationState}
                              currQuestionIndex={currQuestionIndex}
                              index={index}
                            >
                              <Latex>{choice}</Latex>
                            </EliminationText>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
              })}
            </>
          )}

          {true && (
            <div>
              <div
                className={answerStyle(
                  answerChoiceArray[currAnswer] === answer,
                  answerChoiceArray[currAnswer],
                )}
              >
                <span className="text-xl text-white">
                  {answerBannerMsg(
                    answerChoiceArray[currAnswer] === answer,
                    answer,
                  )}
                </span>
              </div>
              <div className="mb-4 mt-6">
                <span className="text-2xl font-bold">Explanation</span>
              </div>
              <div className="mb-4">
                <CSSEdit
                  textString={answerExplanation.correctAnswerExplanation}
                />
                <CSSEdit textString={answerExplanation.choiceOneExplanation} />
                <CSSEdit textString={answerExplanation.choiceTwoExplanation} />
                <CSSEdit
                  textString={answerExplanation.choiceThreeExplanation}
                />
                <CSSEdit textString={answerExplanation.choiceFourExplanation} />
              </div>
            </div>
          )}
          {false && (
            <div>
              <div className={answerStyle(isCorrect, studentAnswer)}>
                <span className="text-xl text-white">
                  {answerBannerMsg(isCorrect, answer)}
                </span>
              </div>
              <div className="mb-4 mt-6">
                <span className="text-2xl font-bold">Explanation</span>
              </div>
              <div className="mb-4">
                <CSSEdit
                  textString={answerExplanation.correctAnswerExplanation}
                />
                <CSSEdit textString={answerExplanation.choiceOneExplanation} />
                <CSSEdit textString={answerExplanation.choiceTwoExplanation} />
                <CSSEdit
                  textString={answerExplanation.choiceThreeExplanation}
                />
                <CSSEdit textString={answerExplanation.choiceFourExplanation} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}