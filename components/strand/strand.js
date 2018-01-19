import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './strand.scss'

export class Strand extends Component {
  render () {
    return (
      <div className='canvas'>
        <svg width='800' height='600' viewBox='0 0 800 600'>
          <path stroke='#2176FF' fill='none' transform='translate(116 98)' strokeWidth='4' d='M 62.0752 382.155C -20.4193 331.415 -20.9637 184 62.0752 134.155C 147.01 83.1726 185.013 286.349 281.075 262.155C 389.431 234.866 284.455 5.32908 396.075 0.15528C 478.995 -3.68823 515.996 64.453 561.075 134.155C 581.496 165.731 553.684 211.312 514.418 253.656C 478.317 292.587 418.576 244.745 396.075 196.655L 396.075 196.655C 356.575 112.234 239.68 253.863 176.032 341.802C 149.185 378.896 101.078 406.145 62.0752 382.155L 62.0752 382.155Z' />
        </svg>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Strand
