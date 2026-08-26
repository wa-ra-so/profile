import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function showFatalError(detail: string) {
  const el = document.getElementById('root')
  if (!el) return
  el.innerHTML = `<pre style="white-space:pre-wrap;padding:16px;font-family:monospace;font-size:12px;color:#111;background:#fff;">読み込みエラー:\n${detail}</pre>`
}

window.addEventListener('error', (e) => {
  showFatalError(e.error?.stack || e.message)
})
window.addEventListener('unhandledrejection', (e) => {
  showFatalError(String(e.reason?.stack || e.reason))
})

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (err) {
  showFatalError(err instanceof Error ? (err.stack ?? err.message) : String(err))
}
