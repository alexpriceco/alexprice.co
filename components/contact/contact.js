import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './contact.scss'

export class Contact extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      step: 0,
      // -1 is error
      // 0 is default
      // 1 is filling
      // 2 is sent

      placeholder: 0,
      valid: false,
      value: ''
    }
  }

  componentDidMount () {
    this.cyclePlaceholder(this.state.placeholder)
  }

  cyclePlaceholder (n) {
    if (this.state.value === '') {
      const newN = n === 2 ? 0 : n + 1
      this.setState({ placeholder: newN })
      setTimeout(() => this.cyclePlaceholder(newN), 3000)
    }
  }

  render () {
    const { step, value, placeholder } = this.state

    return (
      <section className='contact'>
        <div className={step === 0 ? '' : 'up'}>
          <h2>I’m searching for a full-time product design role. Think I’d be a good fit for your team?</h2>
          <a title='📧 alex@alexprice.co' className='button' onClick={() => this.setState({ step: 1 })}>
            <div>
              <svg width='18' height='15.75' viewBox='0 0 16 14' fill='none'>
                <path transform='translate(1.16797 1)' fill='white' d='M 0 3.66025L -0.12941 3.17729C -0.323692 3.22935 -0.467867 3.39275 -0.495321 3.59201C -0.522774 3.79126 -0.428161 3.98757 -0.255196 4.09023L 0 3.66025ZM 13.6603 0L 14.0933 0.25C 14.1944 0.0748627 14.18 -0.14394 14.0569 -0.304381C 13.9338 -0.464821 13.7262 -0.535304 13.5308 -0.482963L 13.6603 0ZM 6.66025 12.1244L 6.18382 12.2761C 6.2439 12.4647 6.40966 12.6002 6.60653 12.6215C 6.80339 12.6427 6.99426 12.5458 7.09327 12.3744L 6.66025 12.1244ZM 3.68893 8.41019C 3.88122 8.212 3.87644 7.89545 3.67826 7.70316C 3.48007 7.51087 3.16352 7.51565 2.97123 7.71384L 3.68893 8.41019ZM 2.22666 8.07282C 1.95649 8.12994 1.78378 8.39525 1.84089 8.66543C 1.898 8.9356 2.16332 9.10831 2.43349 9.0512L 2.22666 8.07282ZM 1.23051 9.86143C 1.39588 9.64028 1.35065 9.32694 1.1295 9.16158C 0.908346 8.99621 0.59501 9.04144 0.429644 9.26259L 1.23051 9.86143ZM -0.164928 10.7396C -0.203867 11.013 -0.0138125 11.2662 0.259571 11.3052C 0.532954 11.3441 0.786141 11.154 0.82508 10.8807L -0.164928 10.7396ZM 0.12941 4.14322L 13.7897 0.482963L 13.5308 -0.482963L -0.12941 3.17729L 0.12941 4.14322ZM 13.2272 -0.25L 6.22724 11.8744L 7.09327 12.3744L 14.0933 0.25L 13.2272 -0.25ZM 7.13668 11.9726L 5.36551 6.41031L 4.41265 6.71372L 6.18382 12.2761L 7.13668 11.9726ZM 5.14428 6.13204L 0.255196 3.23028L -0.255196 4.09023L 4.63389 6.99198L 5.14428 6.13204ZM 13.3607 -0.400358L 4.58956 6.16165L 5.1886 6.96237L 13.9598 0.400358L 13.3607 -0.400358ZM 2.97123 7.71384C 2.92089 7.76571 2.81298 7.8425 2.65786 7.91845C 2.50809 7.99179 2.35052 8.04664 2.22666 8.07282L 2.43349 9.0512C 2.65016 9.0054 2.88587 8.92025 3.0976 8.81657C 3.30399 8.71552 3.52582 8.5783 3.68893 8.41019L 2.97123 7.71384ZM 0.429644 9.26259C 0.229224 9.53063 0.0937013 9.76265 0.00127971 10.0107C -0.0895806 10.2546 -0.129436 10.4905 -0.164928 10.7396L 0.82508 10.8807C 0.859144 10.6415 0.887508 10.4964 0.938369 10.3598C 0.987668 10.2275 1.06737 10.0796 1.23051 9.86143L 0.429644 9.26259Z' />
              </svg>

              <span>Get in touch!</span>
            </div>
          </a>
        </div>

        <div className={step === 0 ? 'down' : (step === 1 ? '' : 'up')}>
          <h2>How can I contact you?</h2>
          <input
            value={value}
            onInput={(e) => this.setState({ value: e.target.value })}
            ref={(r) => { this.inputRef = r }}
          />
          <span className={`placeholder ${value === '' && placeholder === 0 ? '' : 'hidden'}`}>
            your.email@company.com</span>
          <span className={`placeholder ${value === '' && placeholder === 1 ? '' : 'hidden'}`}>
            @twitter_handle</span>
          <span className={`placeholder ${value === '' && placeholder === 2 ? '' : 'hidden'}`}>
            (123) 456-7890</span>
        </div>

        <div className={step < 2 ? 'down' : ''}>
          <h2>Success! I’ll be in touch within a day or so. Till then!</h2>
        </div>

        <div className={step === -1 ? '' : (step === 1 ? 'down' : 'up')}>
          <h2>Error state</h2>
        </div>

        <Stylesheet sheet={sheet} />
      </section>
    )
  }
}

export default Contact
