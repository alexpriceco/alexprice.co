import React, { Component } from 'react'
import Stylesheet from '../general/stylesheet.js'
import sheet from './contact.scss'

const MailIcon = () => (
  <svg width='18' height='15.75' viewBox='0 0 16 14' fill='none'>
    <path transform='translate(1.16797 1)' fill='white' d='M 0 3.66025L -0.12941 3.17729C -0.323692 3.22935 -0.467867 3.39275 -0.495321 3.59201C -0.522774 3.79126 -0.428161 3.98757 -0.255196 4.09023L 0 3.66025ZM 13.6603 0L 14.0933 0.25C 14.1944 0.0748627 14.18 -0.14394 14.0569 -0.304381C 13.9338 -0.464821 13.7262 -0.535304 13.5308 -0.482963L 13.6603 0ZM 6.66025 12.1244L 6.18382 12.2761C 6.2439 12.4647 6.40966 12.6002 6.60653 12.6215C 6.80339 12.6427 6.99426 12.5458 7.09327 12.3744L 6.66025 12.1244ZM 3.68893 8.41019C 3.88122 8.212 3.87644 7.89545 3.67826 7.70316C 3.48007 7.51087 3.16352 7.51565 2.97123 7.71384L 3.68893 8.41019ZM 2.22666 8.07282C 1.95649 8.12994 1.78378 8.39525 1.84089 8.66543C 1.898 8.9356 2.16332 9.10831 2.43349 9.0512L 2.22666 8.07282ZM 1.23051 9.86143C 1.39588 9.64028 1.35065 9.32694 1.1295 9.16158C 0.908346 8.99621 0.59501 9.04144 0.429644 9.26259L 1.23051 9.86143ZM -0.164928 10.7396C -0.203867 11.013 -0.0138125 11.2662 0.259571 11.3052C 0.532954 11.3441 0.786141 11.154 0.82508 10.8807L -0.164928 10.7396ZM 0.12941 4.14322L 13.7897 0.482963L 13.5308 -0.482963L -0.12941 3.17729L 0.12941 4.14322ZM 13.2272 -0.25L 6.22724 11.8744L 7.09327 12.3744L 14.0933 0.25L 13.2272 -0.25ZM 7.13668 11.9726L 5.36551 6.41031L 4.41265 6.71372L 6.18382 12.2761L 7.13668 11.9726ZM 5.14428 6.13204L 0.255196 3.23028L -0.255196 4.09023L 4.63389 6.99198L 5.14428 6.13204ZM 13.3607 -0.400358L 4.58956 6.16165L 5.1886 6.96237L 13.9598 0.400358L 13.3607 -0.400358ZM 2.97123 7.71384C 2.92089 7.76571 2.81298 7.8425 2.65786 7.91845C 2.50809 7.99179 2.35052 8.04664 2.22666 8.07282L 2.43349 9.0512C 2.65016 9.0054 2.88587 8.92025 3.0976 8.81657C 3.30399 8.71552 3.52582 8.5783 3.68893 8.41019L 2.97123 7.71384ZM 0.429644 9.26259C 0.229224 9.53063 0.0937013 9.76265 0.00127971 10.0107C -0.0895806 10.2546 -0.129436 10.4905 -0.164928 10.7396L 0.82508 10.8807C 0.859144 10.6415 0.887508 10.4964 0.938369 10.3598C 0.987668 10.2275 1.06737 10.0796 1.23051 9.86143L 0.429644 9.26259Z' />
  </svg>
)

const TwitterIcon = () => (
  <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z' />
  </svg>
)

const MessageIcon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18'>
    <path stroke='white' fill='none' strokeWidth='1.5' transform='translate(1 1)' d='M 16 7.55557C 16.003 8.72878 15.7289 9.88613 15.2 10.9333C 14.5728 12.1882 13.6086 13.2437 12.4155 13.9816C 11.2223 14.7195 9.84731 15.1106 8.44443 15.1111C 7.27122 15.1142 6.11387 14.8401 5.06666 14.3111L 0 16L 1.68889 10.9333C 1.15994 9.88613 0.885829 8.72878 0.888887 7.55557C 0.88943 6.15269 1.28054 4.77766 2.01841 3.58451C 2.75629 2.39135 3.81178 1.42719 5.06666 0.800024C 6.11387 0.271075 7.27122 -0.00303356 8.44443 2.53227e-05L 8.88887 2.53227e-05C 10.7416 0.10224 12.4916 0.884256 13.8037 2.19634C 15.1157 3.50843 15.8978 5.25837 16 7.11113L 16 7.55557Z' />
  </svg>
)

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
      type: false,
      value: ''
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.step === 0 && this.state.step === 1) {
      setTimeout(() => this.cyclePlaceholder(this.state.placeholder), 2500)
    }

    const { value, type, valid } = this.state
    const getTypeOf = (raw) => {
      const value = raw.trim()
      if (
        !isNaN(parseInt(value.charAt(0))) ||
        value.charAt(0) === '(' ||
        value.charAt(0) === '+'
      ) return 'phone'
      else if (value.charAt(0) === '@') return 'twitter'
      else if (/(.+)@(.+)/.test(value)) return 'email'
      else if (value.length > 5) return 'plain'
      else return false
    }

    const isValid = (type, raw) => {
      const value = raw.trim()
      if (type === 'phone') return value.replace(/\D/g, '').length >= 7
      else if (type === 'twitter' && value.length > 3) return true
      else if (type === 'email') return (/\S+@\S+\.\S+/).test(value)
      else if (value.length > 5) return true
      else return false
    }

    if (value) {
      const newType = getTypeOf(value)
      const newValid = isValid(newType, value)
      console.info(newType, newType === false, newType === 'false', typeof newType)
      if (valid !== newValid) {
        this.setState({ valid: newValid })
        if (newType === false || newType === 'false') {
          setTimeout(() => this.setState({ type: newType }), 1000)
        }
      } else if (type !== newType) {
        if (newType === false || newType === 'false') {
          setTimeout(() => this.setState({ type: newType }), 1000)
        } else this.setState({ type: newType })
      }
    } else if (type !== false) {
      if (typeof type === 'string') {
        setTimeout(() => this.setState({ type: false }), 1000)
      } else this.setState({ type: false })
    }
  }

  cyclePlaceholder (n) {
    if (this.state.value === '') {
      const newN = n === 2 ? 0 : n + 1
      this.setState({ placeholder: newN })
      setTimeout(() => this.cyclePlaceholder(newN), 2500)
    }
  }

  render () {
    const { step, value, valid, placeholder, type } = this.state
    console.debug(type)

    return (
      <section className='contact'>
        <div className={step === 0 ? '' : 'up'}>
          <h2>I’m searching for a full-time product design role. Think I’d be a good fit for your team?</h2>
          <a title='📧 alex@alexprice.co' className='button' onClick={() => this.setState({ step: 1 })}>
            <div>
              <MailIcon />

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

          <div className={`button ${type ? '' : 'hidden'} ${valid ? 'valid' : 'invalid'}`}>
            {type === 'phone' ? <div><MessageIcon /> Send me a text!</div> : ''}
            {type === 'twitter' ? <div><TwitterIcon /> Tweet at me!</div> : ''}
            {type === 'email' ? <div><MailIcon /> Email me!</div> : ''}
            {type === false ? <div><MailIcon /> Send it!</div> : ''}
          </div>
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
