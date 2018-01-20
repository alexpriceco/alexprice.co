import React, { Component } from 'react'
import Router from 'next/router'

import DocumentHead from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import Image from '../components/general/image.js'
import sheet from '../components/base.scss'

import Card from '../components/card/card.js'
import Contact from '../components/contact/contact.js'
import Footer from '../components/footer/footer.js'
import Loader from '../components/loader/loader.js'

import ReactGA from 'react-ga'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      loaded: true,
      error: '',

      cards: [
        {
          title: '⚔️ Playbook',
          id: 'playbook',
          summary: `A simpler D&D character sheet, built with great design, and a focused user experience.`,
          linkText: 'Discover Playbook'
        },
        {
          title: '⚡️ VEXvolt',
          id: 'vexvolt',
          summary: `A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.`,
          linkText: 'Check it out'
        },
        {
          title: '🚙 Evaline, Inc.',
          id: 'evaline-inc',
          summary: `Led product design for three products, then used React and GraphQL to build them.`,
          linkText: 'Read about it'
        },
        {
          title: '📄 Resume',
          id: 'resume',
          summary: `Get a brief overview of some skills I've employed, and projects I’ve worked on.`,
          linkText: 'View resume'
        }
      ]
    }

    this.navigateTo = this.navigateTo.bind(this)
  }

  componentDidMount () {
    this.setState({ loading: false }, () => {
      setTimeout(() => {
        this.setState({ loaded: true })
        ReactGA.initialize('UA-63630411-1')
        ReactGA.pageview(window.location.pathname + window.location.search)
      }, 1000)
    })
  }

  navigateTo (id) {
    let path = `/projects/${id}`
    if (id === 'resume') {
      path = `static/projects/resume/Alexander Price, Product Designer.pdf`
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
    const { loading, loaded } = this.state
    return (
      <main className={loading ? 'loading' : (loaded ? 'loaded' : '')}>
        <DocumentHead />
        <Loader status={loading ? 'loading' : (loaded ? 'loaded' : '')} />
        <header style={{ opacity: loading ? 0 : 'inherit' }}>
          <div>
            <article className='title-group'>
              <h1>
                Thoughtful design,<br />serious technology.
              </h1>
              <h2>
                <span>I'm Alex Price,</span> a digital product designer. My background is in electric vehicles, robotics, and supply chain simulation edtech.
              </h2>
            </article>

            <div className='introducing-me'>
              <Image src='/static/me.jpg' />
            </div>
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
