import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { subscribeNewsletter } from '../utils/api'

export default function Newsletter({ variant = 'default' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setStatus(null)
    try {
      await subscribeNewsletter(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const isFooter = variant === 'footer'

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className={`flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${
            isFooter
              ? 'border-white/20 bg-white/10 text-white placeholder:text-gray-400'
              : 'border-gray-200 bg-white text-text'
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-60 ${
            isFooter
              ? 'bg-secondary text-primary hover:bg-cyan-300'
              : 'btn-primary !py-2.5'
          }`}
        >
          <Send className="h-4 w-4" />
          {loading ? 'Sending...' : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && (
        <p className={`mt-2 flex items-center gap-1 text-sm ${isFooter ? 'text-green-400' : 'text-green-600'}`}>
          <CheckCircle className="h-4 w-4" /> Subscribed successfully!
        </p>
      )}
      {status === 'error' && (
        <p className={`mt-2 flex items-center gap-1 text-sm ${isFooter ? 'text-red-400' : 'text-red-600'}`}>
          <AlertCircle className="h-4 w-4" /> Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}
