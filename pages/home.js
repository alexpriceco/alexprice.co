import React, { Component } from 'react'
import Head from '../components/general/head.js'
import Stylesheet from '../components/general/stylesheet.js'
import sheet from '../components/not-found.scss'

export default class Home extends Component {

  render () {
    return (
      <section>
        <Stylesheet sheet={sheet} />
        <Head title='Home!' />
        <section>
          <h1>Good day, Alexander.</h1>
          <p>
            It's current date, and the weather is N. You have X events today, and Y items on Todoist. 3 are overdue.
            <span>You can head back to <a href='https://alexprice.co' title='Back to safety'>alexprice.co</a>, or, if you think something's wrong, shoot me a quick email at <a href='mailto:alex@alexprice.co' title='Email Alexander'>alex@alexprice.co</a>.</span>
          </p>
        </section>
      </section>
    )
  }
}

export default Home
