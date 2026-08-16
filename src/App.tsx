import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import '@/stores/theme.store'

export default function App() {
  return <RouterProvider router={router} />
}
