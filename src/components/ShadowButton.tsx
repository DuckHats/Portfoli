import React from 'react'
import { Link } from 'react-router-dom'
import { brandConfig } from '../config/brand.config'

interface ShadowButtonProps {
  to: string
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function ShadowButton({
  to,
  children,
  size = 'medium',
  className = '',
}: ShadowButtonProps) {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-12 py-6 text-2xl md:text-4xl',
  }

  const borderWidth = {
    small: 'border-2',
    medium: 'border-3',
    large: 'border-4',
  }

  const shadowOffset = {
    small: 'translate-x-1 translate-y-1',
    medium: 'translate-x-2 translate-y-2',
    large: 'translate-x-2 translate-y-2',
  }

  const hoverTransform = {
    small: 'hover:-translate-y-1 hover:-translate-x-1',
    medium: 'hover:-translate-y-2 hover:-translate-x-2',
    large: 'hover:-translate-y-2 hover:-translate-x-2',
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`absolute inset-0 ${shadowOffset[size]}`}
        style={{
          backgroundColor: brandConfig.colors.primary.black,
        }}
      />
      <Link
        to={to}
        className={`relative inline-flex items-center justify-center gap-2 font-display font-bold ${borderWidth[size]} transition-transform duration-300 ${sizeClasses[size]} ${hoverTransform[size]}`}
        style={{
          backgroundColor: brandConfig.colors.primary.white,
          borderColor: brandConfig.colors.primary.black,
          color: brandConfig.colors.primary.black,
        }}
      >
        {children}
      </Link>
    </div>
  )
}
