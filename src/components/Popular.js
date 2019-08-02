import React from 'react'

const LanguagesNav = ({ selected, onUpdateLanguage }) => {
  const languages = ['All', 'Go', 'Java', 'JavaScript', 'Kotlin', 'Python']
  return (
    <ul className='flex-center'>
      {languages.map((language, index) => (
        <li key={index}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'pink' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage
    })
  }

  render() {
    return (
      <>
        <LanguagesNav
          selected={this.state.selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </>
    )
  }
}
