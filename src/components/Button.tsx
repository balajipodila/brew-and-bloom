import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'dark' | 'light' | 'outline' | 'text'
}

export function Button({ children, variant = 'dark', className = '', ...props }: Props) {
  return <button className={`button button--${variant} ${className}`} {...props}>{children}</button>
}