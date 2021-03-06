import React from 'react'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa'
import Loading from './Loading'
import { fetchPopularRepos } from '../utils/api'
import Tooltip from './Tooltip'

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

const ReposGrid = ({ repos }) => {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url} className='card bg-light'>
            <h4 className='header-lg center-text'>#{index + 1}</h4>
            <img
              className='avatar'
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className='center-text'>
              <a className='link' href={html_url}>
                {login}
              </a>
            </h2>
            <ul className='card-list'>
              <li>
                <Tooltip text='Github username'>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </Tooltip>
              </li>
              <li>
                <FaStar color='rgb(255, 215, 0)' size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                {open_issues.toLocaleString()} open
              </li>
            </ul>
          </li>
        )
      })}
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

        {this.isLoading() && <Loading text='Fetching Repos' />}

        {error && <p className='error'>{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    )
  }
}
