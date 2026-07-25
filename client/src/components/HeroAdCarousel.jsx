import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as Icons from 'lucide-react'

const INTERVAL_MS = 4500

export default function HeroAdCarousel({ ads }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || ads.length <= 1) return undefined

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % ads.length)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [paused, ads.length])

  const goTo = (index) => setActive((index + ads.length) % ads.length)

  const current = ads[active]
  const OverlayIcon = current.overlay?.icon ? Icons[current.overlay.icon] : null

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-primary/30 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
          {ads.map((ad, index) => {
            const isActive = index === active
            const image = (
              <img
                src={ad.image}
                alt={ad.title}
                className={`h-full w-full object-contain ${isActive ? 'hero-ad-zoom' : ''}`}
              />
            )

            return (
              <div
                key={ad.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'z-10 opacity-100 scale-100'
                    : 'z-0 scale-[1.02] opacity-0 pointer-events-none'
                }`}
              >
                {ad.link ? (
                  <Link to={ad.link} className="block h-full w-full">
                    {image}
                  </Link>
                ) : (
                  image
                )}
              </div>
            )
          })}
        </div>

        {ads.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition hover:bg-secondary"
              aria-label="Previous advertisement"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition hover:bg-secondary"
              aria-label="Next advertisement"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {current.overlay && (
        <div
          key={current.id}
          className="hero-ad-float absolute -bottom-4 -left-4 z-30 rounded-xl bg-white p-4 shadow-xl transition-all duration-500"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                current.overlay.tone === 'success' ? 'bg-green-100' : 'bg-secondary/15'
              }`}
            >
              {OverlayIcon && (
                <OverlayIcon
                  className={`h-5 w-5 ${
                    current.overlay.tone === 'success' ? 'text-green-600' : 'text-secondary'
                  }`}
                />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-primary">{current.overlay.title}</p>
              <p className="text-xs text-gray-500">{current.overlay.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      {ads.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {ads.map((ad, index) => (
            <button
              key={ad.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${ad.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active ? 'w-8 bg-secondary' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
