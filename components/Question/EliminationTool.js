import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { answerConvertNumberToLetterQuestion } from '@/lib/utils'
import { useToggle } from '@/lib/ToggleContext'

export function findQuestion(eliminationState, currQuestionIndex) {
  return eliminationState.filter((el) => el.id === currQuestionIndex)
}

export function addEliminationObject(currQuestionIndex, eliminationChoice) {
  return {
    id: currQuestionIndex,
    A: eliminationChoice === 'A' ? false : true,
    B: eliminationChoice === 'B' ? false : true,
    C: eliminationChoice === 'C' ? false : true,
    D: eliminationChoice === 'D' ? false : true,
  }
}

export function handleDisplayHideFun(
  index,
  eliminationState,
  currQuestionIndex,
) {
  const choice = answerConvertNumberToLetterQuestion(index)
  const question = findQuestion(eliminationState, currQuestionIndex)

  if (!_.isEmpty(question) && !_.isUndefined(question)) {
    return !question[0][choice]
  }
}

export const DisplayAddorDeleteEliminationIcon = ({
  currQuestionIndex,
  index,
  eliminationState,
}) => {
  const choice = answerConvertNumberToLetterQuestion(index)
  const question = findQuestion(eliminationState, currQuestionIndex)
  if (!_.isEmpty(question) && !_.isUndefined(question)) {
    return question[0][choice] ? <FaPlus /> : <FaTimes />
  }
  return <FaPlus />
}

export const EliminationText = ({
  isElimationOn,
  eliminationState,
  index,
  currQuestionIndex,
  children,

  ...rest
}) => {
  const textStyle = 'line-through text-slate-400 decoration-4'

  if (isElimationOn) {
    const choice = answerConvertNumberToLetterQuestion(index)
    const question = findQuestion(eliminationState, currQuestionIndex)

    if (!_.isEmpty(question) && !_.isUndefined(question)) {
      return !question[0][choice] ? (
        <div className={textStyle} {...rest}>
          {children}
        </div>
      ) : (
        <div {...rest}>{children}</div>
      )
    }
  }
  return <div {...rest}>{children}</div>
}

export const EliminationTool = ({ handleElimationOnOrOff }) => {
  const { isToggled, toggle } = useToggle()

  function handleOnOrOff() {
    toggle()
    handleElimationOnOrOff(!isToggled)
  }

  return (
    <div className="flex items-center">
      <Switch
        id="elimination-tool-toggle"
        onClick={() => handleOnOrOff()}
        color="red"
        checked={isToggled}
      />
      <Label htmlFor="elimination-tool-toggle">Elimination Tool</Label>
    </div>
  )
}

export const HideElimination = ({ handleElimationHideOrShow }) => {
  const { isToggled, toggle } = useToggle()

  function handleHideOrShowElimination() {
    toggle()
    handleElimationHideOrShow(!isToggled)
  }

  return (
    <div className="flex items-center">
      <Switch
        id="elimination-hide-toggle"
        onClick={() => handleHideOrShowElimination()}
        color="red"
        checked={isToggled}
      />
      <Label htmlFor="elimination-hide-toggle">Hide eliminated answers</Label>
    </div>
  )
}

EliminationTool.propTypes = {
  handleElimationOnOrOff: PropTypes.func,
}

DisplayAddorDeleteEliminationIcon.propTypes = {
  currQuestionIndex: PropTypes.number,
  index: PropTypes.number,
  eliminationState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

EliminationText.propTypes = {
  isElimationOn: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currQuestionIndex: PropTypes.number,
  index: PropTypes.number,
  eliminationState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}