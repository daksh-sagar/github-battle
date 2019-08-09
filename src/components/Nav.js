import React from 'react'
import { ThemeConsumer } from '../contexts/theme'

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <button
            onClick={toggleTheme}
            style={{ fontSize: 30 }}
            className='btn-clear'
          >
            {theme === 'light' ? '🌑' : '🌞'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}
