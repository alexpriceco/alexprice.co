import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './banner.scss'

export class Banner extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      bannerHidden: true,
      userHidden: false
    }

    this.trackScrolling = this.trackScrolling.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scroll', this.trackScrolling)
    setTimeout(() => this.setState({ bannerHidden: false }), 2000)
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.trackScrolling)
  }

  trackScrolling () {
    if (this.banner) {
      const body = document.body
      const html = document.documentElement
      const target = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) - 150

      if (target <= window.innerHeight + window.scrollY) {
        this.setState({ bannerHidden: true })
      } else if (!this.state.userHidden) {
        this.setState({ bannerHidden: false })
      }
    } else console.warn('No banner?')
  }

  render () {
    return (
      <a
        ref={(el) => { this.banner = el }}
        className={'banner' + (this.state.bannerHidden ? ' hidden' : '')}>
        <div className='dismiss' onClick={() => {
          this.setState({ userHidden: true, bannerHidden: true })
          document.removeEventListener('scroll', this.trackScrolling)
        }}>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <rect width='20' height='20' fill='black' fillOpacity='0' />
            <rect width='20' height='20' fill='black' fillOpacity='0' />
            <path d='M5 15L15 5M15 15L5 5' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
        <a href='mailto:alex@alexprice.co'>
          I'm looking for an after-hours project! <br />Need a designer? <a href='mailto:alex@alexprice.co' title={`Let's work together!`}>Shoot me an email.</a>
        </a>
        <Stylesheet sheet={sheet} />
      </a>
    )
  }
}

export default Banner
