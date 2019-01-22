import { Component } from 'react'

let mediumZoom

export class Image extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      src: ''
    }
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      mediumZoom = require('medium-zoom').default
    }

    if (this.props.src && this.state.loading) {
      this.setState({ src: this.props.src.replace('-min', '') })
      this.loadSrc(this.props.src.replace('-min', ''))
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.src && this.state.loading) {
      this.setState({ src: this.props.src.replace('-min', '') })
      this.loadSrc(this.props.src.replace('-min', ''))
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.image && prevState.loading !== this.state.loading) {
      mediumZoom(this.image, {
        background: 'rgba(0, 0, 0, 0.5)',
        margin: 24
      })
    }
  }

  loadSrc (src) {
    this.img = document.createElement('img')
    this.img.src = src || this.state.src
    this.img.onload = () => this.setState({ loading: false })
    this.img.onerror = (e) => console.error(new Error('Img failed to load.', e))
  }

  render () {
    if (!this.state.loading) {
      return <img
        rel={this.props.rel}
        src={this.state.src}
        data-zoom-target={this.state.src}
        className={this.props.className || ''}
        ref={(image) => { this.image = image }}
        style={{ borderRadius: '4px' }}
      />
    } else {
      return <img
        rel={this.props.rel}
        src={this.props.src}
        className={this.props.className || '' + ' loading'}
      />
    }
  }
}

export default Image
