import * as Icons from 'lucide-react'

export default function ServiceCard({ service, compact = false }) {
  const Icon = Icons[service.icon] || Icons.Globe

  if (compact) {
    return (
      <div className="card-hover rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-primary">{service.title}</h3>
        <p className="mb-4 text-sm text-gray-600">{service.shortDesc}</p>
        <ul className="space-y-2">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
              <Icons.Check className="h-4 w-4 shrink-0 text-secondary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="card-hover rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-primary">{service.title}</h3>
      <p className="mb-5 text-gray-600">{service.shortDesc}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {service.features.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
            <Icons.Check className="h-4 w-4 shrink-0 text-secondary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
