import React, { Component } from 'react'

export default class Options extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      selected: -1
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress (e) {
    if (this.props.options.length > 1) {
      const options = this.options.getElementsByClassName('option')
      let numOptions = options.length - 1
      let selectedOption = this.state.selectedOption || 0

      if (e.keyCode === 37 && selectedOption > 0) selectedOption--
      if (e.keyCode === 39 && selectedOption < numOptions) selectedOption++

      options[selectedOption].focus()
    }
  }

  execute (index) {
    this.setState({ selected: index })
    this.props.options[index].onClick()
  }

  render () {
    const { selected } = this.state
    const { options } = this.props
    let renderedOptions = []

    for (let o in options) {
      renderedOptions.push(
        <button key={`button-${o}`}
          className={`option${selected === o ? ' selected' : ''}`}
          autoFocus={parseInt(o) === 0}
          onClick={() => this.execute(o)}
        >{options[o].label}
        </button>
      )
    }

    return (
      <section
        className={`options${selected !== -1 ? ' selected' : ''}`}
        ref={o => { this.options = o }}
        key='options'
      >
        { renderedOptions }
      </section>
    )
  }
}
