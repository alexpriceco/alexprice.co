import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './card.scss'

export class Card extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    const { title, summary, i, id } = this.props
    return (
      <article key={`card--${i}`} className='card'>
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
