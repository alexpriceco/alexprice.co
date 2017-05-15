import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'

import Icon from '../components/general/icon'
import Style from '../components/general/style'
import sheet from '../components/main.scss'

export default class Home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      messageStream: [],
      launch_time: 'CALCULATING...',
      location: 'CALCULATING...',
      local_weather: 'API_UNAVAILABLE',
      nightmode: false,
      username: 'GUEST',
      longitude: '',
      latitude: '',
      firstLoad: true,
      welcomed: false
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress (e) {
    if (this.state.options.length > 1) {
      const options = this.options.getElementsByClassName('option')
      let numOptions = options.length - 1
      let selectedOption = this.state.selectedOption || 0

      if (e.keyCode === 37 && selectedOption > 0) selectedOption--
      if (e.keyCode === 39 && selectedOption < numOptions) selectedOption++

      options[selectedOption].focus()
    }
  }

  post (url, data) {
    data = (data === undefined) ? null : data

    return new Promise(function (resolve, reject) {
      let req = new window.XMLHttpRequest()
      req.onload = () => { resolve(this.responseText) }
      req.onerror = reject
      req.open('POST', url, true)
      req.setRequestHeader('Content-Type', 'Application/JSON')
      req.send(data)
    })
  }

  get (url) {
    return new Promise((resolve, reject) => {
      let req = new window.XMLHttpRequest()
      req.open('GET', url, true)

      req.onload = () => {
        if (req.status >= 200 && req.status < 400) {
          resolve(JSON.parse(req.responseText))
        } else {
          reject(new Error('Something\'s wrong with the server.'))
        }
      }

      req.onerror = () => {
        reject(new Error('Something\'s wrong, request failed.'))
      }

      req.send()
    })
  }

  componentDidUpdate () {
    // const { nightmode } = this.state
    // document.body.style.backgroundColor = nightmode ? '#070709' : '#F8F8F8'
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyPress)
    setTimeout(() => this.setState({ firstLoad: false }), 1000)
    this.getWeather()

    this.setState({ launch_time: new Date().toISOString() })
    this.addMessage(`Welcome, ${this.state.username}.`)

    setTimeout(() => {
      const { location } = this.state
      if (location !== `CALCULATING...`) {
        const suggestion = 'stretch your legs'
        const condition = 'sunny'
        this.addMessage(`Make sure to ${suggestion} today in ${condition} ${location}.`)
      }

      setTimeout(() => this.addMessage(`\nHow may I assist you?`), 250)
      this.setOptions([
        {
          label: 'About',
          onClick: {

          }
        },
        {
          label: 'Projects',
          onClick: {

          }
        }
      ])
    }, 500)

    // const { nightmode } = this.state
    // document.body.style.backgroundColor = nightmode ? '#111111' : '#F8F8F8'

    // Determine if should default to nightmode
    // if (new Date().getHours() < 6) this.setState({ nightmode: true })
    // else if (new Date().getHours() > 19) this.setState({ nightmode: true })
    // else this.setState({ nightmode: false })
  }

  getWeather () {
    // let DARK_SKY_KEY = 'ff0715e86494e35b1ae6adf7e4ebe667'

    this.get('https://jsonip.com').then((res) => {
      this.get(`https://freegeoip.net/json/${res.ip}`).then((res) => {
        if (res.city && res.region_name) {
          this.setState({ location: `${res.city}, ${res.region_name}` })
        } else {
          this.setState({ location: `${res.latitude}, ${res.longitude}` })
        }

        this.setState({
          latitude: res.latitude,
          longitude: res.longitude
        })

        // const darkSkyURL = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/` +
          // `${res.latitude},${res.longitude}`

        // this.get(darkSkyURL).then((res) => console.log(res))
      })
    }).catch((err) => {
      console.log('JSON IP failed to load, with error:', err)
    })
  }

  setOptions (options) {
    this.setState({ options })
  }

  addMessage (message) {
    let messageStream = this.state.messageStream
    messageStream.push(message)
    this.setState({ messageStream })
  }

  renderCI () {
    let messageStream = []

    for (let m in this.state.messageStream) {
      let msg = this.state.messageStream[m]
      if (msg.split(/\n/g).length === 1) {
        messageStream.unshift(<div className='message' key={m}>{msg}</div>)
      } else {
        for (let i in msg.split(/\n/g)) {
          messageStream.unshift(<div className='message' key={`${m}--${i}`}>
            <p />{msg.split(/\n/g)[i]}
          </div>)
        }
      }
    }

    return (
      <section className={`CI nightmode--${this.state.nightmode}`}>
        { messageStream }
      </section>
    )
  }

  renderOptions () {
    const { options } = this.state
    let renderedOptions = []

    for (let o in options) {
      renderedOptions.push(
        <button key={`button-${o}`}
          className='option'
          autoFocus={parseInt(o) === 0}
        >
          {options[o].label}
        </button>
      )
    }

    return (
      <section className='options' ref={o => { this.options = o }}>
        {renderedOptions}
      </section>
    )
  }

  renderProject (project) {
    switch (project) {
      case 'evaline':
        return (
          <article className={`project--${project}`} key={project}>
            <h1>Evaline</h1>
          </article>
        )
      case 'expense':
        return (
          <article className={`project--${project}`} key={project}>
            <h1>Expense</h1>
            <div>Expense is an expense management tool designed to be lightweight, simple, and really easy to use. My team for this project was 100% student run, and we were looking for a way to quickly receive expense reports, and approve or deny them.

            The final product will collect photos and metadata about expenses, store the receipt and data in Firebase, ping the team’s finance group for approval in Slack, and appropriately react to the response.</div>
            <div style={{paddingTop: 0}}>
              <span className='divider'> // </span>
              <a href='https://github.com/gesher-group/expense' title='Source'>
                SOURCE_<Icon name='github' />
              </a>
              <span className='divider'> // </span>
              <a href='https://linkedin.com/in/alexpriceco' title='Demo'>
                DEMO_<Icon name='link' />
              </a>
            </div>
          </article>
        )
      case 'playbook':
        return (
          <article className={`project--${project}`} key={project}>
            <h1>Playbook</h1>
          </article>
        )
      case 'vexvolt':
        return (
          <article className={`project--${project}`} key={project}>
            <h1>VEXVolt</h1>
          </article>
        )
      case 'marketing':
        return (
          <article className={`project--${project}`} key={project}>
            <h1>Marketing</h1>
          </article>
        )
      default: return (<div key='no-selected-project' />)
    }
  }

  render () {
    return (
      <div>
        <Head>
          <title>Alexander Price // Product Designer</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='apple-touch-icon' sizes='57x57' href='../static/favicon/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='../static/favicon/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='../static/favicon/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='../static/favicon/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='../static/favicon/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='../static/favicon/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='../static/favicon/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='../static/favicon/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='../static/favicon/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='192x192' href='../static/favicon/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='../static/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='../static/favicon/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='../static/favicon/favicon-16x16.png' />
          <link rel='manifest' href='../static/favicon/manifest.json' />
          <meta name='msapplication-TileColor' content='#111111' />
          <meta name='msapplication-TileImage' content='../static/favicon/ms-icon-144x144.png' />
          <meta name='theme-color' content='#111111' />
          <Style sheet={sheet} />
        </Head>

        { this.renderCI() }
        { this.renderOptions() }
      </div>
    )
  }
}
