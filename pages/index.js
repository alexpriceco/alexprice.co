import React, { Component } from 'react'
import Router from 'next/router'
import { isDay } from '../components/daylight-sensor/sensor.js'

import DocumentHead from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/base.scss'

import Card from '../components/card/card.js'
import Contact from '../components/contact/contact.js'
import Footer from '../components/footer/footer.js'
import Loader from '../components/loader/loader.js'
import Image from '../components/general/image.js'

import ReactGA from 'react-ga'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      daytime: true,
      loading: true,
      loaded: false,
      error: '',
      bannerHidden: false,

      cards: [{
        id: 'evaline-inc',
        title: 'Evaline, Inc.',
        linkText: 'Read about it',
        summary: `Led product design for three products, then used React and GraphQL to build them.`
      }, {
        id: 'playbook',
        title: 'Playbook',
        linkText: 'Discover Playbook',
        summary: `A simpler D&D character sheet, built with great design, and a focused user experience.`
      }, {
        id: 'vexvolt',
        title: 'VEXvolt',
        linkText: 'Check it out',
        summary: `A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.`
      }, {
        id: 'resume',
        title: 'Resume',
        linkText: 'View resume',
        summary: `Get a brief overview of some skills I've employed, and projects I’ve worked on.`
      }]
    }

    this.navigateTo = this.navigateTo.bind(this)
  }

  componentDidMount () {
    isDay().then(daytime => this.setState({ daytime }))
    this.setState({ loading: false }, () => {
      setTimeout(() => {
        this.setState({ loaded: true })
        ReactGA.initialize('UA-63630411-1')
        ReactGA.pageview(window.location.pathname + window.location.search)

        for (let p of this.state.cards) {
          if (p.id !== 'resume') Router.prefetch(`/projects/${p.id}`)
        }
      }, 1500)
    })
  }

  navigateTo (id) {
    let path = `/projects/${id}`
    if (id === 'resume') {
      path = `static/projects/resume/Alex Price, Product Designer.pdf`
      window.location.href += path
    } else {
      Router.prefetch(path)
      setTimeout(() => Router.push(path), 100)
      this.setState({ loading: true }, () => {
        setTimeout(() => window.scrollTo(0, 0), 300)
      })
    }
  }

  render () {
    const { loading, loaded, daytime } = this.state
    const loadingClass = loading ? 'loading' : (loaded ? 'loaded' : '')
    const daymode = daytime ? ' daymode' : ''
    return (
      <main className={loadingClass + daymode}>
        <DocumentHead />
        <Loader status={loadingClass} dark={daytime} />
        <header style={{ opacity: loading ? 0 : 'inherit' }}>
          <a className={'banner' + (this.state.bannerHidden ? ' hidden' : '')}>
            <div className='dismiss' onClick={() => this.setState({
              bannerHidden: true
            })}>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <rect width='20' height='20' fill='black' fillOpacity='0' />
                <rect width='20' height='20' fill='black' fillOpacity='0' />
                <path d='M5 15L15 5M15 15L5 5' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </div>
            <a href='mailto:alex@alexprice.co'>
              I'm looking for an after-hours project! <br />Need a designer? <a href='mailto:alex@alexprice.co' title={`Let's work together!`}>Shoot me an email.</a>
            </a>
          </a>
          <div>
            <article className='title-group'>
              <h1>
                Thoughtful design,<br />serious technology.
              </h1>
              <h2>
                <span>I'm Alex Price,</span> a digital product designer. My background is in electric vehicles, robotics, and supply chain simulation edtech.
              </h2>
            </article>

            <Image
              rel=''
              className='introducing-me'
              src='static/fade-min.png'
            />
          </div>
          <section className='project-cards'>
            { this.state.cards.map((c, i) => <Card {...c}
              navigateTo={this.navigateTo} key={i} />)
            }
            <div className='placeholder hidden' />
          </section>
        </header>
        <Contact />
        <Footer />
        <Stylesheet sheet={sheet} />
      </main>
    )
  }
}

export default Index
