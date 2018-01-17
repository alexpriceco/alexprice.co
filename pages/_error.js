import React, { Component } from 'react'
import Stylesheet from '../components/stylesheet.js'
import sheet from '../components/not-found.scss'

export default class Error extends Component {
  static getInitialProps ({ res, jsonPageRes }) {
    const statusCode = res
      ? res.statusCode
      : (jsonPageRes ? jsonPageRes.status : null)
    return { statusCode }
  }

  render () {
    return (
      <section>
        <Stylesheet sheet={sheet} />
        <section>
          <h1>Disaster!</h1>
          <p>
            { this.props.statusCode === 404
              ? `The page you're looking for doesn't exist.`
              : (this.props.statusCode === 403
                ? `You don't have access to this page.`
                : `Something's gone terribly wrong.`)
            }
            <span>You can head back to <a href='https://alexprice.co' title='Back to safety'>alexprice.co</a>, or, if you think something's wrong, shoot me a quick email at <a href='mailto:alex@alexprice.co' title='Email Alexander'>alex@alexprice.co</a>.</span>
          </p>
        </section>
      </section>
    )
  }
}
