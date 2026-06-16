import type { Candidate, CandidateStatus } from '../types/candidate'
import { DATASET_URLS, DEFAULT_DATASET, type DatasetKey } from './mockData'

const NETWORK_DELAY_MS = 350
const STATUS_UPDATE_DELAY_MS = 500
const STATUS_UPDATE_FAILURE_RATE = 0.15

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class ApiError extends Error {}

export async function fetchCandidates(dataset: DatasetKey = DEFAULT_DATASET): Promise<Candidate[]> {
  const [response] = await Promise.all([fetch(DATASET_URLS[dataset]), delay(NETWORK_DELAY_MS)])

  if (!response.ok) {
    throw new ApiError(`Не удалось загрузить список кандидатов (${response.status})`)
  }

  return (await response.json()) as Candidate[]
}

export async function fetchCandidateById(
  id: string,
  dataset: DatasetKey = DEFAULT_DATASET,
): Promise<Candidate | null> {
  const candidates = await fetchCandidates(dataset)
  return candidates.find((candidate) => candidate.id === id) ?? null
}

export interface UpdateStatusResult {
  id: string
  status: CandidateStatus
}

/** Simulates PATCH /api/candidates/:id/status with a chance of failure, for optimistic-update rollback testing. */
export async function updateCandidateStatus(
  id: string,
  status: CandidateStatus,
): Promise<UpdateStatusResult> {
  await delay(STATUS_UPDATE_DELAY_MS)

  if (Math.random() < STATUS_UPDATE_FAILURE_RATE) {
    throw new ApiError('Сервер недоступен, не удалось обновить статус')
  }

  return { id, status }
}
