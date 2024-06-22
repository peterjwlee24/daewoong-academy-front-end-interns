import React from 'react'
import { Separator } from './ui/separator'
import Link from 'next/link'

const BreakdownCard = ({
  unit,
  color,
  subjectName,
  subjectKey,
  sectionTitle,
  isSingle,
}) => {
  const getCircleColor = (color) => {
    if (color === 'red') {
      return 'h-6 w-6 rounded-full bg-[#D95454] mr-3'
    } else if (color === 'yellow') {
      return 'h-6 w-6 rounded-full bg-[#ffc300] mr-3'
    } else if (color === 'green') {
      return 'h-6 w-6 rounded-full bg-[#5CB85A] mr-3'
    }
  }

  const getScoreColor = (color) => {
    if (color === 'red') {
      return 'text-right text-[#000000]'
    } else if (color === 'yellow') {
      return 'text-right text-[#000000]'
    } else {
      return 'text-right text-[#000000]'
    }
  }
  return (
    <div className="rounded-xl shadow-sm p-6 bg-darkGray">
      {!isSingle && (
        <div>
          <div className="flex items-center">
            <div className={getCircleColor(color)}></div>
            <h2 className="text-xl">{sectionTitle}</h2>
          </div>
          <div className="py-2">
            <Separator className="bg-black" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-y-4 text-base">
        {unit.length > 0 ? (
          <p className="font-bold text-right">Your Score</p>
        ) : (
          <p className="font-medium text-center">No Data to Display</p>
        )}
        {unit.map((concept, index) => (
          <div key={index} className="flex justify-between">
            <Link
              href={`/${subjectName}/concepts/${encodeURIComponent(
                concept.conceptEncryptedId,
              )}?key=${encodeURIComponent(subjectKey)}&id=${encodeURIComponent(
                subjectName,
              )}&concept=${encodeURIComponent(concept.conceptEncryptedId)}`}
            >
              <div className="hover:underline underline">
                {concept.conceptName}
              </div>
            </Link>
            <p className={getScoreColor(color)}>
              {`${concept.correctConceptQuestions}/${
                concept.totalConceptQuestions
              }, ${(
                (concept.correctConceptQuestions /
                  concept.totalConceptQuestions) *
                100
              ).toFixed(0)}%`}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BreakdownCard
