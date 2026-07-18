import * as Icons from 'lucide-react'

export default function ServiceCard({ service, compact = false }) {
  const Icon = Icons[service.icon] || Icons.Globe
  const isComingSoon = service.comingSoon

  if (compact) {
    return (
      <div
        className={`card-hover rounded-2xl border bg-white p-6 shadow-sm ${
          isComingSoon ? 'border-dashed border-gray-200 opacity-90' : 'border-gray-100'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
              isComingSoon ? 'bg-gray-100' : 'bg-secondary/10'
            }`}
          >
            <Icon className={`h-6 w-6 ${isComingSoon ? 'text-gray-500' : 'text-primary'}`} />
          </div>
          {isComingSoon && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Coming Soon
            </span>
          )}
        </div>
        <h3 className="mb-2 text-lg font-bold text-primary">{service.title}</h3>
        <p className="mb-4 text-sm text-gray-600">{service.shortDesc}</p>
        {!isComingSoon && service.highlights && (
          <ul className="space-y-2">
            {service.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <Icons.Check className="h-4 w-4 shrink-0 text-secondary" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div
      className={`card-hover rounded-2xl border bg-white p-8 shadow-sm ${
        isComingSoon ? 'border-dashed border-gray-200 bg-gray-50/50' : 'border-gray-100'
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
            isComingSoon
              ? 'bg-gray-100'
              : 'bg-gradient-to-br from-secondary/20 to-secondary/5'
          }`}
        >
          <Icon className={`h-7 w-7 ${isComingSoon ? 'text-gray-500' : 'text-primary'}`} />
        </div>
        {isComingSoon && (
          <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
            Coming Soon
          </span>
        )}
      </div>
      <h3 className="mb-2 text-xl font-bold text-primary">{service.title}</h3>
      <p className={isComingSoon ? 'text-gray-600' : 'mb-5 text-gray-600'}>{service.shortDesc}</p>
      {!isComingSoon && service.features && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {service.features.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
              <Icons.Check className="h-4 w-4 shrink-0 text-secondary" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
