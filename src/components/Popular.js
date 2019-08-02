import React from 'react'
import { fetchPopularRepos } from '../utils/api'

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
      selectedLanguage: 'All',
      repos: {},
      error: null
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: { ...repos, [selectedLanguage]: data }
          }))
        })
        .catch(() => {
          this.setState({
            error: 'There was an error while fetching the repos'
          })
        })
    }
  }

  isLoading = () => {
    const { selectedLanguage } = this.state
    return !this.state.repos[selectedLanguage] && this.state.error === null
  }

  render() {
    const { error, repos, selectedLanguage } = this.state
    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
        )}
      </>
    )
  }
}
