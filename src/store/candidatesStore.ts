import { create } from 'zustand'
import type { Candidate, CandidateStatus } from '../types/candidate'
import { fetchCandidates, updateCandidateStatus } from '../services/api'
import { DEFAULT_DATASET, type DatasetKey } from '../services/mockData'
import { useToastStore } from './toastStore'
import { getStatusLabel } from '../utils/helpers'

interface CandidatesState {
  candidates: Candidate[]
  dataset: DatasetKey
  loading: boolean
  error: string | null
  statusUpdating: Record<string, boolean>
  loadCandidates: (dataset?: DatasetKey) => Promise<void>
  setDataset: (dataset: DatasetKey) => Promise<void>
  changeStatus: (id: string, status: CandidateStatus) => Promise<void>
}

export const useCandidatesStore = create<CandidatesState>((set, get) => ({
  candidates: [],
  dataset: DEFAULT_DATASET,
  loading: false,
  error: null,
  statusUpdating: {},

  loadCandidates: async (dataset = get().dataset) => {
    set({ loading: true, error: null })
    try {
      const candidates = await fetchCandidates(dataset)
      set({ candidates, loading: false, dataset })
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Не удалось загрузить кандидатов',
      })
    }
  },

  setDataset: async (dataset) => {
    if (dataset === get().dataset) return
    await get().loadCandidates(dataset)
  },

  changeStatus: async (id, status) => {
    const previous = get().candidates
    const previousCandidate = previous.find((c) => c.id === id)
    if (!previousCandidate) return

    set({
      candidates: previous.map((c) => (c.id === id ? { ...c, status } : c)),
      statusUpdating: { ...get().statusUpdating, [id]: true },
    })

    try {
      await updateCandidateStatus(id, status)
      set({ statusUpdating: { ...get().statusUpdating, [id]: false } })
      useToastStore.getState().showToast('success', `Статус обновлён: «${getStatusLabel(status)}»`)
    } catch (err) {
      set({
        candidates: previous,
        statusUpdating: { ...get().statusUpdating, [id]: false },
      })
      useToastStore
        .getState()
        .showToast('error', err instanceof Error ? err.message : 'Не удалось обновить статус')
    }
  },
}))
