import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 31, 140)'
}

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                className='nav-link'
                to='/'
                activeStyle={activeStyle}
                exact
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                className='nav-link'
                to='/battle'
                activeStyle={activeStyle}
              >
                Battle
              </NavLink>
            </li>
          </ul>
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
