import React from 'react'
import Image from 'next/image'
import acceptableAnswerTable from '@/components/TextEdit/images/acceptableAnswerTable.png'
import { Separator } from '@/components/ui/separator'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { normalizeLatexString } from '@/lib/utils'

export const CSSEdit = ({ textString }) => {
  const processText = (text) => {
    const parts = text.split(
      /(<bold>|<\/bold>|<italics>|<\/italics>|<bigboldtext>|<\/bigboldtext>|<smalltext>|<\/smalltext>|<mediumtext>|<\/mediumtext>|<largetext>|<\/largetext>|<underline>|<\/underline>|<bullet>|<\/bullet>|<latex>|<\/latex>|<bulletSection>|<\/bulletSection>|<img>.*?<\/img>|<fraction>|<\/fraction>)/gi
    );

    return parts
      .map((part, index) => {
        const imgMatch = part.match(/<img>(.*?)<\/img>/i);
        if (imgMatch) {
          const imageSrc = imgMatch[1];
          if (imageSrc === 'acceptableAnswerTable') {
            return (
              <Image
                key={index}
                className="m-auto"
                src={acceptableAnswerTable}
                width={400}
                height={400}
              />
            );
          }
        }

        switch (part.toLowerCase()) {
          case '<bold>':
          case '</bold>':
          case '<bigboldtext>':
          case '</bigboldtext>':
          case '<italics>':
          case '</italics>':
          case '<smalltext>':
          case '</smalltext>':
          case '<mediumtext>':
          case '</mediumtext>':
          case '<largetext>':
          case '</largetext>':
          case '<latex>':
          case '</latex>':
          case '<underline>':
          case '</underline>':
            return null;
          case '<bullet>':
            return { type: 'startBullet' };
          case '</bullet>':
            return { type: 'endBullet' };
          case '<bulletsection>':
            return { type: 'startBulletSection' };
          case '</bulletsection>':
            return { type: 'endBulletSection' };
          case '<fraction>':
          case '</fraction>':
            return null;
          default:
            const isBigBoldText = parts[index - 1] === '<bigboldtext>';
            const isSmallText = parts[index - 1] === '<smalltext>';
            const isMediumText = parts[index - 1] === '<mediumtext>';
            const isLargeText = parts[index - 1] === '<largetext>';
            const isBold = parts[index - 1]?.toLowerCase() === '<bold>';
            const isItalic = parts[index - 1]?.toLowerCase() === '<italics>';
            const isFraction = parts[index - 1]?.toLowerCase() === '<fraction>';
            const isLatex = parts[index - 1]?.toLowerCase() === '<latex>';
            const isUnderline =
              parts[index - 1]?.toLowerCase() === '<underline>';
            const isBullet = parts.slice(0, index).some((p) => p === '<bullet>');

            let element = <span key={index}>{part}</span>;
            if (isBold)
              element = (
                <span key={index} className="font-bold">
                  {part}
                </span>
              );
            if (isBigBoldText) {
              element = (
                <span key={index} className="text-xl font-medium">
                  {part}
                </span>
              );
            }
            if (isSmallText) {
              element = (
                <span key={index} className="text-sm">
                  {part}
                </span>
              );
            }
            if (isMediumText) {
              element = (
                <span key={index} className="text-base">
                  {part}
                </span>
              );
            }
            if (isLargeText) {
              element = (
                <span key={index} className="text-lg">
                  {part}
                </span>
              );
            }
            if (isItalic)
              element = (
                <span key={index} className="italic">
                  {part}
                </span>
              );
            if (isLatex) {
              element = (
                <span style={{ display: 'inline-block' }}>
                  <Latex key={index}>{normalizeLatexString(part)}</Latex>
                </span>
              );
              part = '';
            }
            if (isUnderline)
              element = (
                <span key={index} className="underline">
                  {part}
                </span>
              );
            if (isFraction) {
              const fractionParts = part.split('_');
              if (fractionParts.length === 3) {
                element = (
                  <span key={index} className="inline-flex">
                    <div className="pr-0.5 text-base">{fractionParts[0]}</div>
                    <div className="flex flex-col text-xs pr-0.5">
                      <div className="">{fractionParts[1]}</div>
                      <Separator
                        orientation="horizontal"
                        className="bg-[#000] border-1"
                      />
                      <div>{fractionParts[2]}</div>
                    </div>
                  </span>
                );
              }
            }
            if (isBullet) return { type: 'bulletContent', element: element };

            return element;
        }
      })
      .filter((part) => part !== null); // Filter out null values
  };

  const processLine = (line, key) => {
    // Remove </new> tags
    const cleanedLine = line.replace(/<\/new>/gi, '');

    const processedText = processText(cleanedLine);
    const content = [];
    let currentBulletSection = [];
    let currentBullet = [];

    processedText.forEach((part) => {
      if (part.type === 'startBullet') {
        currentBullet = [];
      } else if (part.type === 'endBullet') {
        currentBulletSection.push(
          <li key={currentBulletSection.length}>{currentBullet}</li>
        );
      } else if (part.type === 'bulletContent') {
        currentBullet.push(part.element);
      } else if (part.type === 'startBulletSection') {
        currentBulletSection = [];
      } else if (part.type === 'endBulletSection') {
        content.push(
          <ul key={content.length} className="list-disc pl-5">
            {currentBulletSection}
          </ul>
        );
      } else {
        content.push(part);
      }
    });

    return (
      <div key={key} className="mb-4">
        {content}
      </div>
    );
  };

  return (
    <div>
      {textString
        ? textString
            .toString()
            .split(/<new>/gi)
            .filter((line) => line.trim() !== '')
            .map((line, index) => processLine(line, index))
        : ''}
    </div>
  );
};