import _ from 'lodash'
import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { CSSEdit } from '@/components/TextEdit/CSSEdit'

export const QuestionContext = ({
  className,
  context,
  images,
  isBreakRoom,
  isMultipleChoice,
  isContextEmpty,
  section,
  handleSelectText,
  highlights,
  handleHighlightClick,
  questionIndex,
  isTestStarted,
}) => {
  const paragraphRef = useRef(null)
  const [tooltip, setTooltip] = useState({
    visible: false,
    note: '',
    x: 0,
    y: 0,
  })

  const paragraphText = context[0]

  let isMathFRQ = false

  if (section != null && isMultipleChoice != null && isContextEmpty != null) {
    isMathFRQ =
      section.sectionTitle === 'Math'
        ? isMultipleChoice === false || isContextEmpty === true
        : false
  }

  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0 && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()

      if (
        paragraphRef.current &&
        (paragraphRef.current.contains(range.commonAncestorContainer) ||
          paragraphRef.current === range.commonAncestorContainer)
      ) {
        const preSelectionRange = document.createRange()
        preSelectionRange.selectNodeContents(paragraphRef.current)
        preSelectionRange.setEnd(range.startContainer, range.startOffset)
        const start = preSelectionRange.toString().length
        const end = start + selectedText.length
        handleSelectText(selectedText, start, end)
      }
    }
  }

  const showTooltip = (e, dynamicText) => {
    const tooltipX = e.clientX
    const tooltipY = e.clientY

    const resizeX = e.clientX < 140 ? 100 : 20

    setTooltip({
      visible: true,
      note: dynamicText,
      x: tooltipX + resizeX,
      y: tooltipY - 20,
    })
  }

  const renderParagraphWithHighlights = () => {
    let lastIndex = 0
    let elements = []

    const sortedHighlights = [...highlights]
      .sort((a, b) => a.start - b.start)
      .filter((question) => question.questionIndex == questionIndex)

    sortedHighlights.forEach((highlight, index) => {
      const { start, end, note, text } = highlight

      if (start > lastIndex) {
        elements.push(
          <span key={`text-before-${index}`}>
            {paragraphText.slice(lastIndex, start)}
          </span>,
        )
      }

      elements.push(
        <span
          key={`highlight-${index}`}
          className="bg-yellow-300"
          onMouseEnter={(e) => showTooltip(e, note)}
          onMouseLeave={() =>
            setTooltip((prev) => ({ ...prev, visible: false }))
          }
          onClick={() => handleHighlightClick(highlight, index)}
        >
          {paragraphText.slice(start, end)}
        </span>,
      )

      lastIndex = end
    })

    if (lastIndex < paragraphText.length) {
      elements.push(
        <span key="text-end">{paragraphText.slice(lastIndex)}</span>,
      )
    }

    return elements
  }

  return (
    <>
      {isBreakRoom ? (
        <div className={cn('w-full relative mx-4', className)}>
          <h1 className="text-2xl font-bold py-4">{context[0]}</h1>
          <h2 className="text-sm py-2">{context[1]}</h2>
          <p className="text-sm py-2">{context[2]}</p>
          <p className="text-sm font-semibold py-2">{context[3]}</p>
          <p className="text-sm ">{context[4]}</p>
          <p className="text-sm">{context[5]}</p>
          <p className="text-sm">{context[6]}</p>
        </div>
      ) : (
        <div className={cn('w-full space-y-8 relative mx-4', className)}>
          {context.length > 0 &&
            context[0] !== '' &&
            context.map((context, index) => (
              <div
                ref={paragraphRef}
                onMouseUp={handleMouseUp}
                className="box-border border rounded p-6"
                key={index}
              >
                {isTestStarted && renderParagraphWithHighlights()}
                {tooltip.visible && (
                  <div
                    className="fixed p-2 bg-white text-black text-xs rounded"
                    style={{
                      top: `${tooltip.y}px`,
                      left: `${tooltip.x}px`,
                      transform: 'translate(-50%, -100%)',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word', // Ensure long words do not extend outside the tooltip's bounds
                      maxWidth: '300px',
                      zIndex: 50,
                      width: '60%',
                      minHeight: '140px',
                      border: '2px solid black',
                      fontSize: '14px',
                    }}
                  >
                    {tooltip.note}
                  </div>
                )}
                <CSSEdit textString={context} />
              </div>
            ))}
          <div className="relative space-y-3">
            {images.length > 0 &&
              images.map((image, index) => (
                <div className="box-border border rounded" key={index}>
                  <Image
                    src={image}
                    alt=""
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    // Overwritten by styles above
                    width={650}
                    height={450}
                  />
                </div>
              ))}
          </div>
          {isMathFRQ ? <CSSEdit textString={section.sectionDirections} /> : ''}
        </div>
      )}
    </>
  )
}
