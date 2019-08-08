import React, { Component } from 'react'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px'
  }
}

export default class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hovering: false
    }
  }

  mouseOver = () => {
    this.setState({
      hovering: true
    })
  }

  mouseOut = () => {
    this.setState({
      hovering: false
    })
  }

  render() {
    const { text, children } = this.props
    const { hovering } = this.state

    return (
      <div
        onMouseOut={this.mouseOut}
        onMouseOver={this.mouseOver}
        style={styles.container}
      >
        {hovering && <div style={styles.tooltip}>{text}</div>}
        {children}
      </div>
    )
  }
}