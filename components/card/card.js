import React, { Component } from 'react'
import Stylesheet from '../stylesheet.js'
import sheet from './card.scss'

export class Card extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    const { data } = this.props
    return (
      <div>
        { Object.keys(data).map((key, n) => {
          return (
            <p className='row' key={n}>
              <span>{key}</span>: <span>{data[key]}</span>
            </p>
          )
        })}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Card
