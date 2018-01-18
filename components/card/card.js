import React from 'react'
import Router from 'next/router'

import Stylesheet from '../general/stylesheet.js'
import sheet from './card.scss'

import Image from '../general/image.js'

export const ArrowIcon = () => (
  <svg width='16' height='11' viewBox='0 0 19 13'>
    <path fill='white' d='M 0.410156 6.38535C 0.410156 6.38535 1.5 7.11192 2.5 7.11192L 14.5 7.11184L 12.2374 9.24223C 12.127 9.35258 12.0497 9.48539 12.0055 9.63969L 11.5331 11.2725C 11.4447 11.5708 11.4337 11.753 11.5 11.8194L 11.7901 12.1094C 11.9557 12.2749 12.1353 12.2613 12.3286 12.0679L 18.2845 6.11202L 12.3286 0.15613C 12.1353 -0.0372296 11.9557 -0.0509015 11.7901 0.114626L 11.5 0.404665C 11.4337 0.471071 11.4447 0.6532 11.5331 0.95154L 12.0055 2.58435C 12.0497 2.73865 12.127 2.87146 12.2374 2.98181L 14.5 5.11192L 0.410156 5.11187C 0.136719 5.11187 0 5.22905 0 5.46343L 0 6.02207C 0 6.11582 0.136719 6.23692 0.410156 6.38535Z' />
  </svg>
)

export const Card = (props) => (
  <article
    className='card'
    onClick={() => Router.push({
      pathname: props.id === 'resume'
        ? 'static/projects/resume/Alexander Price, Product Designer.pdf'
        : `/${props.id}`
    })}
  >
    <h2>{props.title}</h2>
    <p>{props.summary}</p>
    <div><span>{props.linkText}</span><ArrowIcon /></div>
    <Image src={`static/projects/${props.id}/preview-min.jpg`} rel='' />
    <Stylesheet sheet={sheet} />
  </article>
)

export default Card
