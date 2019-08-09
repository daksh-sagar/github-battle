import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'
import './App.css'
import Nav from './components/Nav'
import Results from './components/Results'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(prevState => ({
          theme: prevState.theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <Switch>
                <Route path='/' exact component={Popular} />
                <Route path='/battle' exact component={Battle} />
                <Route path='/battle/results' component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App
