import { Component } from 'react'

export class Image extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      src: ''
    }
  }

  componentDidMount () {
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

  loadSrc (src) {
    this.img = document.createElement('img')
    this.img.src = src || this.state.src
    this.img.onload = () => this.setState({ loading: false })
    this.img.onerror = () => this.setState({ loading: false })
  }

  render () {
    if (!this.state.loading) {
      return <img
        rel={this.props.rel}
        src={this.state.src}
        className={this.props.className || ''}
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
