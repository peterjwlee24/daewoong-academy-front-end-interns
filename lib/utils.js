import _ from 'lodash'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertNumberToLetterQuestion(answer) {
  if (_.isUndefined(answer) || _.isNull(answer) || answer === '') {
    return 'Omitted'
  } else if (answer === 0) {
    return 'A'
  } else if (answer === 1) {
    return 'B'
  } else if (answer === 2) {
    return 'C'
  } else if (answer === 3) {
    return 'D'
  }
  return answer
}

export function studentAnserconvertLetterToNumber(answer) {
  if (answer === 'A') {
    return 0
  } else if (answer === 'B') {
    return 1
  } else if (answer === 'C') {
    return 2
  } else if (answer === 'D') {
    return 3
  }
  return answer
}

export function answerConvertNumberToLetterQuestion(answer) {
  if (answer === 0) {
    return 'A'
  } else if (answer === 1) {
    return 'B'
  } else if (answer === 2) {
    return 'C'
  } else if (answer === 3) {
    return 'D'
  }
  return answer
}

export const answerBannerMsg = (isCorrect, answer) => {
  if (
    isCorrect === 'Omitted' ||
    _.isUndefined(answer) ||
    _.isNull(answer) ||
    _.isEmpty(answer)
  ) {
    return `Omitted response . The correct answer is option ${answer}.`
  }
  if (isCorrect) {
    return `Correct response . The answer is option ${answer}.`
  }
  if (!isCorrect) {
    return `Incorrect response. The correct answer is option ${answer}.`
  }
}

export const frqAnswerBannerMsg = (isCorrect, answer) => {
  if (
    isCorrect === 'Omitted' ||
    _.isUndefined(answer) ||
    _.isNull(answer) ||
    _.isEmpty(answer)
  ) {
    return `Omitted response . The correct answer is ${answer}.`
  }
  if (isCorrect) {
    return `Correct response . The answer is ${answer}.`
  }
  if (!isCorrect) {
    return `Incorrect response. The correct answer is ${answer}.`
  }
}

export const answerStyle = (isCorrect, answer) => {
  if (
    isCorrect === 'Omitted' ||
    _.isUndefined(answer) ||
    _.isNull(answer) ||
    _.isEmpty(answer)
  ) {
    return `p-4 bg-yellow-400 mb-8 mt-8`
  }
  if (isCorrect) {
    return `p-4 bg-green-400 mb-8 mt-8`
  }
  if (!isCorrect) {
    return `p-4 bg-red-400 mb-8 mt-8`
  }
}

export const eliminationStateObj = [
  { id: 0, A: true, B: true, C: true, D: true },
]
