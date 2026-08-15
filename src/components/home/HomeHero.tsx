import { Button } from '@/components/ui/Button'
import { IMAGES } from '@/constants/images'
import { ROUTES } from '@/constants/routes'
import { Link } from 'react-router-dom'

export function HomeHero() {
  return (
    <section className="relative min-h-screen bg-black">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 pb-10 pt-28 text-center sm:px-6 sm:pt-32">
        <p className="text-sm font-medium text-ink-200">iPhone 16 Pro</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
          El futuro en tus manos
        </h1>
        <p className="mt-5 max-w-xl text-base text-ink-300 sm:text-lg">
          Rendimiento, cámara y diseño en un solo dispositivo.
        </p>
        <div className="mt-8">
          <Link to={ROUTES.catalog}>
            <Button size="lg">Comprar</Button>
          </Link>
        </div>

        <img
          src={IMAGES.iphone16Pro}
          alt="iPhone 16 Pro en titanio negro, natural, blanco y desierto"
          referrerPolicy="no-referrer"
          className="mt-10 w-full max-w-5xl flex-1 object-contain object-bottom sm:mt-14"
        />
      </div>
    </section>
  )
}
