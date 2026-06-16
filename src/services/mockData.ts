export type DatasetKey = 'default' | 'large'

export const DATASET_URLS: Record<DatasetKey, string> = {
  default: '/mock/candidates.json',
  large: '/mock/candidates-large.json',
}

export const DEFAULT_DATASET: DatasetKey = 'default'
