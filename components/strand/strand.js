import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './strand.scss'

export class Strand extends Component {
  render () {
    return (
      <div className='canvas'>
        <svg width='800' height='600' viewBox='0 0 800 600'>
          <filter x='98' y='80' width='605.591' height='440.395' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0' />
            <feOffset />
            <feGaussianBlur stdDeviation='8' />
            <feColorMatrix type='matrix' values='0 0 0 0 0.129412 0 0 0 0 0.462745 0 0 0 0 1 0 0 0 0.5 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
          </filter>

          <path stroke='#2176FF' strokeWidth='4' id='path1' transform='translate(116 98)' d='M 62.0752 382.155C -20.4193 331.415 -20.9637 184 62.0752 134.155C 147.01 83.1726 185.013 286.349 281.075 262.155C 389.431 234.866 284.455 5.32908 396.075 0.15528C 478.995 -3.68823 515.996 64.453 561.075 134.155C 609.892 209.638 435.178 466.424 383.075 365.155C 352.881 306.468 564.12 220.755 492.5 185.5C 390.465 135.273 263.002 420.752 133.575 403.655C 104.669 399.837 86.9109 397.431 62.0752 382.155Z' />
        </svg>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Strand
