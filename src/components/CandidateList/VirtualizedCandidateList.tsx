import { memo } from 'react'
import { List, type RowComponentProps } from 'react-window'
import type { Candidate } from '../../types/candidate'
import { CandidateCard } from '../CandidateCard/CandidateCard'

interface RowProps {
  candidates: Candidate[]
}

function Row({ index, style, candidates }: RowComponentProps<RowProps>) {
  const candidate = candidates[index]
  return (
    <div style={style} className="px-1 pb-4">
      <CandidateCard candidate={candidate} />
    </div>
  )
}

interface VirtualizedCandidateListProps {
  candidates: Candidate[]
  height?: number
}

function VirtualizedCandidateListComponent({ candidates, height = 600 }: VirtualizedCandidateListProps) {
  return (
    <List
      rowComponent={Row}
      rowCount={candidates.length}
      rowHeight={172}
      rowProps={{ candidates }}
      style={{ height }}
      className="rounded-lg"
    />
  )
}

export const VirtualizedCandidateList = memo(VirtualizedCandidateListComponent)
