import { memo, useState } from 'react'
import { List, type RowComponentProps } from 'react-window'
import type { Candidate } from '../../types/candidate'
import { CandidateCard } from '../CandidateCard/CandidateCard'

const INITIAL_CHUNK = 25
const LOAD_MORE_CHUNK = 25
const LOAD_MORE_THRESHOLD = 5

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

interface RenderedRange {
  startIndex: number
  stopIndex: number
}

function VirtualizedCandidateListComponent({ candidates, height = 600 }: VirtualizedCandidateListProps) {
  const [loadedCount, setLoadedCount] = useState(() => Math.min(INITIAL_CHUNK, candidates.length))
  const [prevCandidates, setPrevCandidates] = useState(candidates)
  const [renderedRange, setRenderedRange] = useState<RenderedRange>({ startIndex: 0, stopIndex: 0 })

  // Reset the reveal progress during render when the underlying list changes
  // (e.g. a filter was applied), instead of syncing it in an effect.
  if (candidates !== prevCandidates) {
    setPrevCandidates(candidates)
    setLoadedCount(Math.min(INITIAL_CHUNK, candidates.length))
  }

  const visibleCount = Math.min(loadedCount, candidates.length)
  const renderedRowCount = candidates.length === 0 ? 0 : renderedRange.stopIndex - renderedRange.startIndex + 1

  function handleRowsRendered(visibleRows: RenderedRange) {
    // Bail out when the range is unchanged so this doesn't loop: react-window
    // re-invokes this callback on every commit, not just when scrolling.
    setRenderedRange((prev) =>
      prev.startIndex === visibleRows.startIndex && prev.stopIndex === visibleRows.stopIndex
        ? prev
        : visibleRows,
    )
    if (visibleRows.stopIndex >= visibleCount - 1 - LOAD_MORE_THRESHOLD && visibleCount < candidates.length) {
      setLoadedCount((count) => Math.min(count + LOAD_MORE_CHUNK, candidates.length))
    }
  }

  return (
    <div>
      <p className="mb-2 text-xs text-slate-400">
        В DOM сейчас отрисовано строк: <span className="font-medium text-slate-600">{renderedRowCount}</span>{' '}
        (диапазон {renderedRange.startIndex}–{renderedRange.stopIndex}) · загружено {visibleCount} из{' '}
        {candidates.length}
      </p>
      <List
        rowComponent={Row}
        rowCount={visibleCount}
        rowHeight={172}
        rowProps={{ candidates }}
        onRowsRendered={handleRowsRendered}
        style={{ height }}
        className="rounded-lg border border-slate-200"
      />
      {visibleCount < candidates.length && (
        <p className="mt-2 text-center text-xs text-slate-400">Прокрутите вниз, чтобы догрузить ещё…</p>
      )}
    </div>
  )
}

export const VirtualizedCandidateList = memo(VirtualizedCandidateListComponent)
