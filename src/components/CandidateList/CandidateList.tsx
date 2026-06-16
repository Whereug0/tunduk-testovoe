import { memo } from 'react'
import type { Candidate } from '../../types/candidate'
import { CandidateCard } from '../CandidateCard/CandidateCard'

interface CandidateListProps {
  candidates: Candidate[]
}

function CandidateListComponent({ candidates }: CandidateListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  )
}

export const CandidateList = memo(CandidateListComponent)
