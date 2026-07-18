import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'

export default function PortfolioModal({ project, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close project preview"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition hover:bg-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-56 overflow-hidden sm:h-72">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              {project.type}
            </span>
            <h2 id="portfolio-modal-title" className="mt-2 text-2xl font-bold text-white">
              {project.title}
            </h2>
            <p className="text-sm text-gray-200">{project.category}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-gray-600">{project.desc}</p>

          {project.features && (
            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-primary">Project Features</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 shrink-0 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/book-order" className="btn-primary flex-1 justify-center" onClick={onClose}>
              Start a Similar Project
            </Link>
            <button type="button" onClick={onClose} className="btn-outline flex-1 justify-center">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
