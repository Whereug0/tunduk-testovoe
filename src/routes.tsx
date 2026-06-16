import { Route, Routes } from 'react-router-dom'
import { CandidatesPage } from './pages/CandidatesPage'
import { CandidateDetailPage } from './pages/CandidateDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CandidatesPage />} />
      <Route path="/candidate/:id" element={<CandidateDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
