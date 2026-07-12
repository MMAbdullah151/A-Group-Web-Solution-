export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 md:px-8 md:py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl text-center">
        {breadcrumb && (
          <p className="mb-3 text-sm font-medium text-secondary">{breadcrumb}</p>
        )}
        <h1 className="text-3xl font-bold text-white md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
