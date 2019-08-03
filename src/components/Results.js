import React, { Component } from 'react'
import { battle } from '../utils/api'

export default class Results extends Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    }
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props
    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          loading: false,
          error: null
        })
      })
      .catch(({ message }) => {
        this.setState({
          loading: false,
          error: message
        })
      })
  }

  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}
