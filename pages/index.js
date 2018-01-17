import React, { Component } from 'react'

import Stylesheet from '../components/stylesheet.js'
import sheet from '../components/base.scss'

import Card from '../components/card/card.js'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: ''
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
        <header>
          // title
          <Card data={this.state.data} />
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
