import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/constants/routes'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-white">Página no encontrada</h1>
      <p className="mt-4 font-light text-ink-400">La ruta no existe.</p>
      <Link to={ROUTES.home} className="mt-8 inline-block">
        <Button>Volver al inicio</Button>
      </Link>
    </Container>
  )
}
