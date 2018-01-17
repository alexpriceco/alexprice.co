import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './card.scss'

import asyncImages from '../../lib/async-images.js'

export class Card extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true
    }
  }

  componentDidUpdate () {
    console.info(this.ref, this.ref.images)
    if (this.state.loading && this.ref && this.ref.images) {
      this.setState({ loading: false })

      asyncImages(this.ref.images, 'n')
        .then((res) => console.info(`response is: `, res))
        .catch((err) => console.error('ERROR: ', err))
    }
  }

  componentDidMount () {
    console.info(Object.keys(this.ref), this.ref.images)
    if (this.ref && this.ref.images) {
      asyncImages(this.ref.images, '1')
    }
  }

  render () {
    const { title, summary, id } = this.props
    return (
      <article
        className='card'
        ref={r => { this.ref = r }}
      >
        <h2>{title}</h2>
        <p>{summary}</p>
        <img
          src={`static/projects/${id}/preview-min.jpg`} className='loading'
        />
        <Stylesheet sheet={sheet} />
      </article>
    )
  }
}

export default Card
