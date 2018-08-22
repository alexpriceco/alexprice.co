import React, { Component } from 'react'

import { isDay } from '../daylight-sensor/sensor.js'

import DocumentHead from '../general/head.js'
import Stylesheet from '../general/stylesheet.js'
import sheet from './article.scss'

import Contact from '../contact/contact.js'
import Footer from '../footer/footer.js'
import Loader from '../loader/loader.js'
import Banner from '../banner'

import ReactGA from 'react-ga'

export class Page extends Component {
  static async getInitialProps (context) {
    const { originalUrl } = context.req || {}
    return { originalUrl }
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      daytime: true,
      loading: true,
      loaded: true,
      error: ''
    }
  }

  componentDidMount () {
    isDay().then(daytime => this.setState({ daytime }))
    setTimeout(() => this.setState({ loading: false }, () => {
      setTimeout(() => this.setState({ loaded: true }), 1000)
      ReactGA.initialize('UA-63630411-1')
      ReactGA.pageview(window.location.pathname + window.location.search)
    }), 300)
  }

  render () {
    const { loading, loaded, daytime } = this.state
    const loadingClass = loading ? 'loading' : (loaded ? 'loaded' : '')
    const daymode = daytime ? 'daymode ' : ''

    return (
      <main className={`${loadingClass} ${daymode} ${this.props.id}`}>
        <DocumentHead />
        <Loader status={loadingClass} dark={daytime} />
        <Banner />
        {this.props.children}
        <Contact />
        <Footer />
        <Stylesheet sheet={sheet} />
      </main>
    )
  }
}

export default Page
