import React, { Component } from 'react'
import DocumentHead from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/base.scss'

import Card from '../components/card/card.js'
import Contact from '../components/contact/contact.js'
import Footer from '../components/footer/footer.js'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: '',

      cards: [
        {
          title: '🚙 Evaline, Inc.',
          id: 'evaline-inc',
          summary: `Led product design for three products, then used React and GraphQL to build them.`,
          linkText: 'Read about it'
        },
        {
          title: '⚡️ VEXvolt',
          id: 'vexvolt',
          summary: `A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.`,
          linkText: 'Check it out'
        },
        {
          title: '⚔️ Playbook',
          id: 'playbook',
          summary: `A simpler D&D character sheet, built with great design, and a focused user experience.`,
          linkText: 'Discover Playbook'
        },
        {
          title: '📄 Resume',
          id: 'resume',
          summary: `Get a brief overview of some skills I've employed, and projects I’ve worked on.`,
          linkText: 'View resume'
        }
      ]
    }
  }

  componentDidMount () {
    this.setState({ loading: false })
  }

  render () {
    return (
      <main class={this.state.loading ? 'loading' : ''}>
        <DocumentHead />
        <header>
          <div className='title'>
            <h1>
              I'm Alex. 👋
            </h1>
            <h2>
              Digital product designer from ATX. Background in electric vehicles, robotics, and supply chain edtech. D&D on the weekends.
            </h2>
          </div>
          <section className='project-cards'>
            {this.state.cards.map((card, i) => <Card {...card} key={i} />)}
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
