import _ from 'lodash';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CSSEdit } from '@/components/TextEdit/CSSEdit';

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
  const paragraphRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    note: '',
    x: 0,
    y: 0,
  });

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();

      if (
        paragraphRef.current &&
        (paragraphRef.current.contains(range.commonAncestorContainer) ||
          paragraphRef.current === range.commonAncestorContainer)
      ) {
        const preSelectionRange = document.createRange();
        preSelectionRange.selectNodeContents(paragraphRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;
        const end = start + selectedText.length;
        handleSelectText(selectedText, start, end);
      }
    }
  };

  const showTooltip = (e, dynamicText) => {
    const tooltipX = e.clientX;
    const tooltipY = e.clientY;

    const resizeX = e.clientX < 140 ? 100 : 20;

    setTooltip({
      visible: true,
      note: dynamicText,
      x: tooltipX + resizeX,
      y: tooltipY - 20,
    });
  };

  const renderParagraphWithHighlights = () => {
    let lastIndex = 0;
    let elements = [];

    const sortedHighlights = [...highlights]
      .sort((a, b) => a.start - b.start)
      .filter((question) => question.questionIndex === questionIndex);

    sortedHighlights.forEach((highlight, index) => {
      const { start, end, note } = highlight;

      if (start > lastIndex) {
        elements.push(
          <span key={`text-before-${index}`}>
            {context[0].slice(lastIndex, start)}
          </span>
        );
      }

      elements.push(
        <span
          key={`highlight-${index}`}
          className="bg-yellow-300"
          onMouseEnter={(e) => showTooltip(e, note)}
          onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}
          onClick={() => handleHighlightClick(highlight, index)}
        >
          {context[0].slice(start, end)}
        </span>
      );

      lastIndex = end;
    });

    if (lastIndex < context[0].length) {
      elements.push(<span key="text-end">{context[0].slice(lastIndex)}</span>);
    }

    return elements;
  };

  return (
    <div className={cn('w-full space-y-8 relative mx-4', className)}>
      {context.length > 0 && context[0] !== '' && (
        <div
          ref={paragraphRef}
          onMouseUp={handleMouseUp}
          className="box-border border rounded p-6"
        >
          {isTestStarted && renderParagraphWithHighlights()}
          {!isTestStarted && <CSSEdit textString={context[0]} />}
          {tooltip.visible && (
            <div
              className="fixed p-2 bg-white text-black text-xs rounded"
              style={{
                top: `${tooltip.y}px`,
                left: `${tooltip.x}px`,
                transform: 'translate(-50%, -100%)',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
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
        </div>
      )}
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
                width={650}
                height={450}
              />
            </div>
          ))}
      </div>
      {isBreakRoom && <CSSEdit textString={section.sectionDirections} />}
    </div>
  );
};
