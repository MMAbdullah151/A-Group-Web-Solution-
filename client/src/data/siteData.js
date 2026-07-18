export const SITE = {
  name: 'A Group Web Solution',
  tagline: 'Connecting Businesses Worldwide',
  phone: '+94 77 335 1122',
  whatsapp: '94773351122',
  email: 'mmabdulrahman57@gmail.com',
  address: 'Gampaha, Sri Lanka',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62208015947!2d79.861243!3d6.927079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2da38!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
  },
}

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/book-order', label: 'Book an Order' },
  { path: '/contact', label: 'Contact' },
  { path: '/faq', label: 'FAQ' },
]

export const CURRENT_SERVICES = [
  {
    id: 'business',
    title: 'Business Website Development',
    icon: 'Globe',
    shortDesc:
      'Build a professional, responsive, and modern website that helps your business establish a strong online presence. We create fast, user-friendly, and mobile-optimized websites tailored to your business needs.',
    features: [
      'Responsive Design',
      'Modern UI/UX',
      'Contact Forms',
      'WhatsApp Integration',
      'Google Maps Integration',
      'SEO-Friendly Structure',
      'Fast Loading Speed',
      'Mobile & Tablet Friendly',
    ],
    highlights: ['Responsive Design', 'Modern UI/UX', 'Contact Forms', 'Mobile Friendly'],
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance',
    icon: 'Wrench',
    shortDesc:
      'Keep your website secure, up-to-date, and running smoothly. We provide ongoing maintenance services to ensure your website performs at its best.',
    features: [
      'Website Updates',
      'Bug Fixes',
      'Security Checks',
      'Performance Optimization',
      'Backup & Recovery',
      'Content Updates',
      'Technical Support',
    ],
    highlights: ['Website Updates', 'Security Checks', 'Backup & Recovery', 'Technical Support'],
  },
  {
    id: 'hosting',
    title: 'Domain & Hosting Services',
    icon: 'Server',
    shortDesc:
      'We help you register your domain name and choose reliable web hosting solutions to ensure your website is secure, fast, and always available online.',
    features: [
      'Domain Name Registration',
      'Web Hosting Setup',
      'SSL Certificate Installation',
      'Business Email Setup',
      'DNS Configuration',
      'Website Migration',
      'Hosting Renewal Assistance',
    ],
    highlights: ['Domain Registration', 'Web Hosting Setup', 'SSL Certificate', 'Business Email Setup'],
  },
]

export const COMING_SOON_SERVICES = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Website Development',
    icon: 'ShoppingCart',
    shortDesc:
      'Launch your online store with a secure shopping experience, product management, and online ordering features.',
    comingSoon: true,
  },
  {
    id: 'redesign',
    title: 'Website Redesign',
    icon: 'Palette',
    shortDesc: 'Transform your existing website with a fresh, modern, and responsive design.',
    comingSoon: true,
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    icon: 'TrendingUp',
    shortDesc: "Improve your website's visibility on search engines and attract more customers.",
    comingSoon: true,
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    icon: 'Megaphone',
    shortDesc: 'Grow your business through effective online marketing strategies and social media campaigns.',
    comingSoon: true,
  },
  {
    id: 'ai',
    title: 'AI-Powered Business Solutions',
    icon: 'Bot',
    shortDesc: 'Integrate smart AI tools to automate processes and improve customer engagement.',
    comingSoon: true,
  },
]

export const SERVICES_INTRO = {
  tag: 'Our Current Services',
  title: 'What We Offer Today',
  subtitle:
    'We currently specialize in professional Business Website Development, Website Maintenance, and Domain & Hosting Services. As we continue to grow, we\'ll be introducing additional digital services to help businesses succeed online. Stay tuned for exciting new offerings coming soon!',
}

/** @deprecated Use CURRENT_SERVICES — kept for any legacy imports */
export const SERVICES = CURRENT_SERVICES

export const WHY_CHOOSE_US = [
  { icon: 'DollarSign', title: 'Affordable Pricing', desc: 'Quality websites at prices that fit your budget.' },
  { icon: 'Smartphone', title: 'Mobile Friendly', desc: 'Perfect experience on phones, tablets, and desktops.' },
  { icon: 'Zap', title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality.' },
  { icon: 'Headphones', title: 'Customer Support', desc: 'Friendly help whenever you need it.' },
  { icon: 'Palette', title: 'Modern UI/UX', desc: 'Clean, professional designs that convert visitors.' },
  { icon: 'Shield', title: 'Secure Websites', desc: 'Built with security and reliability in mind.' },
  { icon: 'HeartHandshake', title: 'Beginner-Friendly', desc: 'We guide you through every step, no tech skills needed.' },
  { icon: 'Monitor', title: 'Responsive Design', desc: 'Looks great on every screen size automatically.' },
]

export const PROCESS_STEPS = [
  { step: 1, title: 'Consultation', desc: 'We learn about your business and goals.' },
  { step: 2, title: 'Planning', desc: 'We map out pages, features, and timeline.' },
  { step: 3, title: 'Website Design', desc: 'We create a modern design you will love.' },
  { step: 4, title: 'Development', desc: 'We build your website with clean code.' },
  { step: 5, title: 'Testing', desc: 'We test on all devices before launch.' },
  { step: 6, title: 'Launch', desc: 'Your website goes live for the world to see.' },
  { step: 7, title: 'Support', desc: 'We stay with you after launch.' },
]

export const CURRENT_PORTFOLIO = [
  {
    id: 1,
    title: 'Green Leaf Restaurant',
    category: 'Restaurant Website',
    type: 'Business Website',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    desc: 'Modern restaurant website with menu, gallery, and online reservations.',
    features: ['Responsive Design', 'Menu & Gallery', 'Contact Form', 'Google Maps', 'WhatsApp Integration'],
  },
  {
    id: 2,
    title: 'TechStart Solutions',
    category: 'Company Website',
    type: 'Business Website',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    desc: 'Corporate profile website with team section and service showcase.',
    features: ['Company Profile', 'Services Showcase', 'Team Section', 'Contact Form', 'Mobile Optimized'],
  },
]

export const COMING_SOON_PORTFOLIO = [
  {
    id: 3,
    title: 'Fashion Hub Store',
    category: 'Online Store',
    type: 'E-Commerce Website',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeqqOGwUSOtmw6_BiFkYK-luVrX-2djwA0mrVItdU0eQ&s=10',
    desc: 'Full e-commerce store with product catalog and shopping cart.',
    comingSoon: true,
  },
  {
    id: 4,
    title: 'Creative Studio',
    category: 'Portfolio Website',
    type: 'Portfolio Website',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    desc: 'Stunning portfolio showcasing creative work and client projects.',
    comingSoon: true,
  },
]

export const PORTFOLIO_INTRO = {
  tag: 'Our Current Work',
  title: 'Business Websites We Build',
  subtitle:
    'These sample projects showcase the business websites we currently deliver. E-commerce and portfolio-style projects are coming soon as we expand our services.',
}

/** All portfolio items — current first, then coming soon */
export const PORTFOLIO = [...CURRENT_PORTFOLIO, ...COMING_SOON_PORTFOLIO]

export const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    company: 'Bloom Cafe',
    rating: 5,
    text: 'A Group Web Solution built us a beautiful website that brought in so many new customers. Professional, fast, and affordable!',
  },
  {
    name: 'James Rodriguez',
    company: 'TechFix Pro',
    rating: 5,
    text: 'They understood exactly what we needed. Our new business website looks modern and works perfectly on mobile phones.',
  },
  {
    name: 'Priya Sharma',
    company: 'Style Boutique',
    rating: 5,
    text: 'Our online store is exactly what we wanted. Easy to manage and our customers love the shopping experience.',
  },
  {
    name: 'Michael Chen',
    company: 'BuildRight Construction',
    rating: 5,
    text: 'Great team, great communication, and an amazing final product. Highly recommend for any business website.',
  },
]

export const PRICING = [
  {
    name: 'Starter',
    price: 'LKR 25,000',
    period: 'one-time',
    desc: 'Perfect for small businesses getting started online.',
    features: [
      'Up to 5 Pages',
      'Responsive Design',
      'Contact Form',
      'Google Maps',
      'WhatsApp Integration',
      'Basic SEO Setup',
      '1 Month Free Support',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: 'LKR 50,000',
    period: 'one-time',
    desc: 'Best for growing businesses that need more features.',
    features: [
      'Up to 10 Pages',
      'Everything in Starter',
      'Image Gallery',
      'Social Media Links',
      'Newsletter Signup',
      'Advanced SEO',
      '3 Months Free Support',
      'Website Training',
    ],
    popular: true,
    cta: 'Most Popular',
  },
  {
    name: 'Premium',
    price: 'LKR 75,000',
    period: 'one-time',
    desc: 'Full e-commerce solution for online selling.',
    features: [
      'Unlimited Pages',
      'Everything in Professional',
      'E-Commerce Store',
      'Product Management',
      'Shopping Cart',
      'Cash on Delivery',
      'Admin Dashboard',
      '6 Months Free Support',
    ],
    popular: false,
    comingSoon: true,
    cta: 'Coming Soon',
  },
]

export const FAQS = [
  {
    q: 'How long does it take to build a website?',
    a: 'A standard business website typically takes 1-2 weeks. E-commerce websites may take 2-4 weeks depending on the number of products and features required.',
  },
  {
    q: 'How much does a website cost?',
    a: 'Our Starter package begins at LKR 25,000 for a basic business website. Professional and Premium packages offer more features. Contact us for a custom quote tailored to your needs.',
  },
  {
    q: 'Do you provide hosting?',
    a: 'Yes! We assist with domain registration and web hosting setup. We recommend affordable, reliable hosting providers and handle the entire setup for you.',
  },
  {
    q: 'Can I update my website later?',
    a: 'Absolutely. We build websites that are easy to update. We also offer monthly maintenance packages for updates, backups, security, and performance optimization.',
  },
  {
    q: 'Do you build online stores?',
    a: 'E-commerce websites are coming soon! We currently focus on business websites, maintenance, and domain & hosting. Contact us to be notified when our Premium e-commerce package launches.',
  },
  {
    q: 'Will my website work on mobile phones?',
    a: 'Every website we build is fully responsive and tested on mobile phones, tablets, laptops, and desktop computers.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. All packages include free support after launch. We also offer affordable monthly maintenance plans for long-term care of your website.',
  },
  {
    q: 'Can I see examples of your work?',
    a: 'Visit our Portfolio page to see demo projects including business websites, restaurant sites, online stores, and company profiles.',
  },
]

export const BUSINESS_TYPES = [
  'Restaurant / Cafe',
  'Retail / Shop',
  'Professional Services',
  'Healthcare',
  'Education',
  'Real Estate',
  'Construction',
  'Technology',
  'Other',
]

export const WEBSITE_TYPES = [
  'Business Website',
  'E-Commerce Website',
  'Portfolio Website',
  'Company Profile',
  'Landing Page',
  'Website Redesign',
  'Other',
]

export const BUDGET_OPTIONS = [
  'Under LKR 25,000',
  'LKR 25,000 - LKR 50,000',
  'LKR 50,000 - LKR 75,000',
  'Over $1000',
  'Not Sure Yet',
]

export const FEATURE_OPTIONS = [
  'Contact Form',
  'Google Maps',
  'WhatsApp Chat',
  'Image Gallery',
  'Online Store',
  'Blog Section',
  'Newsletter',
  'Social Media Links',
  'SEO Optimization',
  'Multi-language',
]
