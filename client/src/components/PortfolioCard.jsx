import { Eye, Rocket } from 'lucide-react'

export default function PortfolioCard({ project, onView, compact = false }) {
  const isComingSoon = project.comingSoon

  return (
    <div
      className={`card-hover group overflow-hidden rounded-2xl border bg-white shadow-sm ${
        isComingSoon ? 'border-dashed border-gray-200' : 'border-gray-100'
      }`}
    >
      <div className={`relative overflow-hidden ${compact ? 'h-48' : 'h-64'}`}>
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isComingSoon ? 'opacity-80 grayscale-[30%]' : 'group-hover:scale-105'
          }`}
        />
        <div
          className={`absolute inset-0 flex items-end bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-6 transition-opacity ${
            isComingSoon ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {isComingSoon ? (
            <span className="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              <Rocket className="h-4 w-4" />
              Coming Soon
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onView?.(project)}
              className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-cyan-300"
            >
              View Project <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
        {isComingSoon && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Coming Soon
          </span>
        )}
      </div>
      <div className={compact ? 'p-5' : 'p-6'}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-primary">
            {project.type}
          </span>
          <span className="text-xs text-gray-400">{project.category}</span>
        </div>
        <h3 className={`font-bold text-primary ${compact ? '' : 'text-xl'}`}>{project.title}</h3>
        <p className={`mt-2 text-gray-600 ${compact ? 'text-sm' : ''}`}>{project.desc}</p>
        {!isComingSoon && (
          <button
            type="button"
            onClick={() => onView?.(project)}
            className="mt-4 text-sm font-semibold text-secondary hover:underline"
          >
            View Project Details →
          </button>
        )}
      </div>
    </div>
  )
}
