import { Link } from 'react-router-dom'
import {
  Globe,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'
import { SITE, NAV_LINKS } from '../data/siteData'
import Newsletter from './Newsletter'

function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

const SOCIAL = [
  { href: SITE.social.facebook, icon: Facebook, label: 'Facebook' },
  { href: SITE.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: SITE.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: SITE.social.tiktok, icon: TikTokIcon, label: 'TikTok' },
  { href: SITE.social.youtube, icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/20">
                <Globe className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-bold">{SITE.name}</p>
                <p className="text-sm text-gray-400">{SITE.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              We help businesses establish a strong online presence with professional,
              affordable, and modern websites.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-secondary">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-secondary">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe for tips, updates, and special offers.
            </p>
            <Newsletter variant="footer" />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
