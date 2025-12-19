import React from 'react'
import { Link } from 'react-router-dom'
import { brandConfig } from '../config/brand.config'
import { useContent } from '../hooks/useContent'

export function Footer() {
  const content = useContent()

  return (
    <footer
      className="border-t-4 py-16 px-4 md:px-8 mt-32"
      style={{
        backgroundColor: brandConfig.colors.primary.white,
        borderColor: brandConfig.colors.primary.black,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Internal Links */}
          <div className="flex flex-col space-y-3">
            <h3
              className="font-display font-bold text-xl mb-4 pb-2 border-b-4 inline-block"
              style={{
                color: brandConfig.colors.primary.black,
                borderColor: brandConfig.colors.primary.black,
              }}
            >
              {content.footer.internal}
            </h3>
            <Link
              to="/"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.home}
            </Link>
            <Link
              to="/about"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.about}
            </Link>
            <Link
              to="/team"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.team}
            </Link>
            <Link
              to="/projects"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.projects}
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-3">
            <h3
              className="font-display font-bold text-xl mb-4 pb-2 border-b-4 inline-block"
              style={{
                color: brandConfig.colors.primary.black,
                borderColor: brandConfig.colors.primary.black,
              }}
            >
              {content.footer.contact}
            </h3>
            <a
              href="mailto:info@duckhats.cat"
              className="font-mono text-sm transition-colors inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.accent.red
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              info@duckhats.cat
            </a>
            <div className="pt-4">
              <h4
                className="font-mono font-bold text-sm mb-2"
                style={{
                  color: brandConfig.colors.primary.black,
                }}
              >
                {content.footer.socials}
              </h4>
              <a
                href="https://github.com/DuckHats"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm transition-colors inline-block w-fit"
                style={{
                  color: brandConfig.colors.neutral.gray600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.accent.red
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.neutral.gray600
                }}
              >
                @duckhats
              </a>
            </div>
          </div>

          {/* DuckHats Info */}
          <div className="flex flex-col space-y-4 md:items-end md:text-right">
            <h3
              className="font-display font-bold text-4xl"
              style={{
                color: brandConfig.colors.primary.black,
              }}
            >
              DuckHats
            </h3>
            <div
              className="h-1 w-24 md:ml-auto"
              style={{
                backgroundColor: brandConfig.colors.primary.black,
              }}
            />
            <p
              className="font-mono text-sm whitespace-pre-line"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
            >
              {content.footer.tagline}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 border-t-2 text-center"
          style={{
            borderColor: brandConfig.colors.neutral.gray300,
          }}
        >
          <p
            className="font-mono text-xs"
            style={{
              color: brandConfig.colors.neutral.gray400,
            }}
          >
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}