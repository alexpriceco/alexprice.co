import React, { Component } from 'react'
import DocumentHead from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/base.scss'

import Card from '../components/card/card.js'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
      error: '',

      cards: [
        {
          title: 'VEXvolt',
          id: 'vexvolt',
          summary: `A patented hardware product for VEX robotics competitors, 3d printed on a Form 2.`
        },
        {
          title: 'Playbook',
          id: 'playbook',
          summary: `A simpler D&D character sheet, built with great design, and a focused user experience.`
        },
        {
          title: 'Evaline, Inc',
          id: 'evaline-inc',
          summary: `Led product design for three products, then used React and GraphQL to build them.`
        },
        {
          title: 'Resume',
          id: 'resume',
          summary: `Get a brief overview of some skills I've employed, and projects I’ve worked on.`
        }
      ]
    }
  }

  componentDidMount () {
  }

  render () {
    if (this.state.loading) {
      return (
        <main>
          Just a second...
          <Stylesheet sheet={sheet} />
        </main>
      )
    }

    return (
      <main>
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
            {this.state.cards.map((card, i) => <Card {...card} i={i} />)}
          </section>
        </header>
        <section>
          // contact me
        </section>
        <footer>
          // footer stuff
        </footer>
        <Stylesheet sheet={sheet} />
      </main>
    )
  }
}

export default Index
