import { Button } from '@/components/ui/Button'
import { IMAGES, VIDEOS } from '@/constants/images'
import { ROUTES } from '@/constants/routes'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const play = () => {
      void video.play().catch(() => undefined)
    }
    play()
    video.addEventListener('canplay', play)
    return () => video.removeEventListener('canplay', play)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 pb-6 pt-28 text-center sm:px-6 sm:pt-32">
        <p className="relative z-10 text-sm font-medium text-ink-200">iPhone 16 Pro</p>
        <h1 className="relative z-10 mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
          El futuro en tus manos
        </h1>
        <p className="relative z-10 mt-5 max-w-xl text-base text-ink-300 sm:text-lg">
          Rendimiento, cámara y diseño en un solo dispositivo.
        </p>
        <div className="relative z-10 mt-8">
          <Link to={ROUTES.catalog}>
            <Button size="lg">Comprar</Button>
          </Link>
        </div>

        <div className="relative mt-8 flex w-full flex-1 items-end justify-center sm:mt-10">
          <video
            ref={videoRef}
            className="h-full max-h-[62vh] w-full object-contain object-bottom motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={IMAGES.iphone16Pro}
            referrerPolicy="no-referrer"
            aria-hidden
            disablePictureInPicture
            controls={false}
          >
            <source src={VIDEOS.hero} type="video/mp4" />
            <source src={VIDEOS.heroFallback} type="video/mp4" />
          </video>
          <img
            src={IMAGES.iphone16Pro}
            alt="iPhone 16 Pro"
            referrerPolicy="no-referrer"
            className="hidden max-h-[62vh] w-full object-contain object-bottom motion-reduce:block"
          />
        </div>
      </div>
    </section>
  )
}
