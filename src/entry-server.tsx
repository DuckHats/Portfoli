/**
 * Build-time prerender (scripts/generate-seo.ts): renders a URL of the app to HTML so every page
 * ships its real content, readable by any crawler or link preview and painted before the script
 * runs. Lazy routes resolve before the HTML is returned (onAllReady). The browser then renders the
 * same tree over it (main.tsx).
 */
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './app/App'
import { MotionProvider } from './components/motion/MotionProvider'
import features from './components/motion/features'

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk: Buffer, _encoding, done) {
        html += chunk.toString()
        done()
      },
      final(done) {
        resolve(html)
        done()
      },
    })
    const stream = renderToPipeableStream(
      <HelmetProvider context={{}}>
        <MotionProvider features={features}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </MotionProvider>
      </HelmetProvider>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
