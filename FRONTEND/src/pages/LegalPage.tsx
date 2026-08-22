import { Container } from '@/components/ui/Container'
import { appConfig } from '@/config/app'
import { ROUTES } from '@/constants/routes'
import { useLocation } from 'react-router-dom'

const COPY: Record<string, { title: string; body: string }> = {
  [ROUTES.privacy]: {
    title: 'Privacidad',
    body: `${appConfig.name} protege los datos de navegación y de compra. Esta página es un placeholder de frontend; las políticas legales se definirán junto al backend.`,
  },
  [ROUTES.terms]: {
    title: 'Términos',
    body: `Condiciones de uso de ${appConfig.name}. Esta pantalla existe para completar la navegación del diseño; el texto legal definitivo se publicará más adelante.`,
  },
}

export function LegalPage() {
  const { pathname } = useLocation()
  const content = COPY[pathname] ?? COPY[ROUTES.privacy]

  return (
    <Container className="py-16">
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink-900">{content.title}</h1>
      <p className="mt-8 max-w-2xl font-light leading-relaxed text-ink-500">{content.body}</p>
    </Container>
  )
}
