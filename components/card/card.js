import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './card.scss'

import Image from '../general/image.js'

export class Card extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // any state?
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
        <Image src={`static/projects/${id}/preview-min.jpg`} rel='' />
        <Stylesheet sheet={sheet} />
      </article>
    )
  }
}

export default Card
