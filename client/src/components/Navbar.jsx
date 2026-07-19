import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { SITE, NAV_LINKS } from '../data/siteData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src="/Logo.jpeg"
            alt="A Group Web Solution logo"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <div>
            <span className="block text-lg font-bold text-primary leading-tight">{SITE.name}</span>
            <span className="hidden text-xs text-gray-500 sm:block">{SITE.tagline}</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/5 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/book-order" className="btn-primary ml-2 !py-2.5 !px-5 text-sm">
            Get Free Quote
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-primary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-primary/5 text-primary' : 'text-gray-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/book-order"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 text-center text-sm"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
