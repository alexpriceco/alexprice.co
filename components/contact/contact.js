import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './contact.scss'
import Image from '../general/image.js'

export class Contact extends Component {
  render () {
    return (
      <section className='contact'>
        <Image src='static/me-min.jpg' className='loading' rel="That's me!" />
        <h2>Let's talk.</h2>
        <p>I'm open for contract work, and currently interviewing for a full-time product design role.</p>
        <a href='mailto:alex@alexprice.co?Subject=I%27d%20like%20to%20hire/contract%20you%21' title='📧 alex@alexprice.co' className='button'>
          <div>
            <svg width='16' height='12.444' viewBox='0 0 18 14'>
              <path transform='translate(1 1)' d='M 0.00176325 0L 0.00176325 -0.75C -0.412407 -0.75 -0.748176 -0.414281 -0.748237 -0.000110203L 0.00176325 0ZM 16.0009 0L 16.7509 2.46763e-05C 16.7509 -0.198892 16.6719 -0.389664 16.5313 -0.530321C 16.3906 -0.670979 16.1998 -0.75 16.0009 -0.75L 16.0009 0ZM 16.0005 12L 16.0005 12.75C 16.4147 12.75 16.7505 12.4143 16.7505 12.0001L 16.0005 12ZM 0 12L -0.75 11.9999C -0.750029 12.1989 -0.671025 12.3896 -0.530369 12.5303C -0.389714 12.671 -0.198931 12.75 0 12.75L 0 12ZM 0.00176325 0.75L 16.0009 0.75L 16.0009 -0.75L 0.00176325 -0.75L 0.00176325 0.75ZM 15.2509 -2.46763e-05L 15.2505 12L 16.7505 12.0001L 16.7509 2.46763e-05L 15.2509 -2.46763e-05ZM 16.0005 11.25L 0 11.25L 0 12.75L 16.0005 12.75L 16.0005 11.25ZM 0.75 12.0001L 0.751763 0.000110203L -0.748237 -0.000110203L -0.75 11.9999L 0.75 12.0001Z' />
              <path transform='translate(1 3)' d='M 16.4115 0.627036C 16.7578 0.399775 16.8543 -0.06519 16.627 -0.411492C 16.3998 -0.757795 15.9348 -0.854297 15.5885 -0.627036L 16.4115 0.627036ZM 8 5.25L 7.58851 5.87704C 7.83834 6.04099 8.16166 6.04099 8.41149 5.87704L 8 5.25ZM 0.411492 -0.627036C 0.06519 -0.854297 -0.399775 -0.757795 -0.627036 -0.411492C -0.854297 -0.06519 -0.757795 0.399775 -0.411492 0.627036L 0.411492 -0.627036ZM 15.5885 -0.627036L 7.58851 4.62296L 8.41149 5.87704L 16.4115 0.627036L 15.5885 -0.627036ZM 8.41149 4.62296L 0.411492 -0.627036L -0.411492 0.627036L 7.58851 5.87704L 8.41149 4.62296Z' />
            </svg>
            <span>Email me</span>
          </div>
        </a>
        <Stylesheet sheet={sheet} />
      </section>
    )
  }
}

export default Contact
