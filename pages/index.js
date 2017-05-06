import React, { Component } from 'react'
import Head from 'next/head'

import { CSSTransitionGroup } from 'react-transition-group'
import Icon from '../components/general/icon'
import Style from '../components/general/style'
import sheet from '../components/main.scss'

export default class Home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      launch_time: 'CALCULATING...',
      location: 'CALCULATING...',
      local_weather: 'API_UNAVAILABLE',
      nightmode: false,
      username: 'guest',
      longitude: '',
      latitude: '',
      selectedProject: '',
      firstLoad: true
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
    const { nightmode } = this.state
    document.body.style.backgroundColor = nightmode ? '#070709' : '#F8F8F8'
  }

  componentDidMount () {
    this.setState({ launch_time: new Date().toISOString() })
    setTimeout(() => { this.setState({ firstLoad: false }) }, 1500)

    const { nightmode } = this.state
    document.body.style.backgroundColor = nightmode ? '#111111' : '#F8F8F8'

    // Determine if should default to nightmode
    if (new Date().getHours() < 6) this.setState({ nightmode: true })
    else if (new Date().getHours() > 19) this.setState({ nightmode: true })
    else this.setState({ nightmode: false })

    let DARK_SKY_KEY = 'ff0715e86494e35b1ae6adf7e4ebe667'

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

        let darkSkyURL = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/` +
          `${res.latitude},${res.longitude}`

        console.log(darkSkyURL) // TODO: build a Node server to process this req
        // this.get(darkSkyURL).then((res) => {
        //   console.log(res)
        // })
      })
    }).catch((err) => {
      console.log('JSON IP failed to load, with error:', err)
    })
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
    const { selectedProject, nightmode } = this.state

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

        <div className={`body nightmode--${nightmode}`}>
          <section className='system-logs'>
            <div className='system-log'>
              SYSTEM_LOADING... DONE. <br />
              Welcome, {this.state.username}. [ FUNCTION UNAVAILABLE ]
            </div>

            <div className='system-log'>
              LAUNCH_TIME: {this.state.launch_time} <br />
              DARKMODE_ACTIVE:&nbsp;
              <div className='nightmode-toggle'
                onClick={() => this.setState({ nightmode: !nightmode })}>
                {nightmode ? '[-]' : '[ ]'}
              </div>
            </div>

            <div className='system-log'>
              <Icon name='logo' className='logo' />
            </div>

            <div className='system-log'>
              LOCATION: {this.state.location} <br />
              CONDITIONS: {this.state.local_weather}
            </div>
          </section>

          <CSSTransitionGroup
            component='section'
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionName={'core-animation'}
            className={`home selected--${selectedProject} ${
              this.state.firstLoad ? ' animate-in' : ''}`}
            key={`selected--${selectedProject}`}
          >
            <Icon name='logo' className='logo' />

            <article>
              <h1>About</h1>
              <div>I’m a Product Designer in Santa Cruz working on workplace electric vehicle charging, a student-operated software team at UC Santa Cruz, and a D&D app called Playbook.
              </div>
              <div style={{paddingTop: 0}}>
                <a href='https://github.com/alexpriceco'
                  title='Github profile'>
                  <Icon name='github' />
                </a><span className='divider'> // </span>
                <a href='https://linkedin.com/in/alexpriceco'
                  title='LinkedIn profile'><Icon name='linkedin' />
                </a><span className='divider'> // </span>
                <a href='https://instagram.com/alexpriceco'
                  title='Instagram photos'><Icon name='instagram' />
                </a>
              </div>
            </article>

            <article>
              <h1>Projects</h1>
              <ol>
                <li
                  className={selectedProject === 'evaline' ? 'selected' : ''}
                  onClick={() => this.setState({ selectedProject: 'evaline' })}
                >
                  <div>Evaline</div>
                  <div className='dotted' />
                  <span className='indicator'>
                    {selectedProject === 'evaline' ? 'SELECTED >' : 'MORE'}
                  </span>
                </li>

                <li
                  className={selectedProject === 'playbook' ? 'selected' : ''}
                  onClick={() => this.setState({ selectedProject: 'playbook' })}
                >
                  <div>Playbook</div>
                  <span className='indicator'>
                    {selectedProject === 'playbook' ? 'SELECTED >' : 'MORE'}
                  </span>
                </li>

                <li
                  className={selectedProject === 'expense' ? 'selected' : ''}
                  onClick={() => this.setState({ selectedProject: 'expense' })}
                >
                  <div>Expense</div>
                  <div className='dotted' />
                  <span className='indicator'>
                    {selectedProject === 'expense' ? 'SELECTED >' : 'MORE'}
                  </span>
                </li>

                <li
                  className={selectedProject === 'vexvolt' ? 'selected' : ''}
                  onClick={() => this.setState({ selectedProject: 'vexvolt' })}
                >
                  <div>VEXVolt</div>
                  <span className='indicator'>
                    {selectedProject === 'vexvolt' ? 'SELECTED >' : 'MORE'}
                  </span>
                </li>

                <li
                  className={selectedProject === 'marketing' ? 'selected' : ''}
                  onClick={() => this.setState({ selectedProject: 'marketing' })}
                >
                  <div>Marketing</div>
                  <div className='dotted' />
                  <span className='indicator'>
                    {selectedProject === 'marketing' ? 'SELECTED >' : 'MORE'}
                  </span>
                </li>
              </ol>
            </article>

            {/* <article>
              <h1>Contact</h1>
              <div>You can <a href='https://alexprice.co/meet'>schedule a meeting</a>, or email me at <a href='mailto:alex@alexprice.co' title='Shoot me an email'>alex@alexprice.co</a>.
              You can also find me here: <a href='https://github.com/alexpriceco' title='My Github profile'><Icon name='github' /></a> • <a href='https://linkedin.com/in/alexpriceco' title='My LinkedIn profile'><Icon name='linkedin' /></a> • <a href='https://instagram.com/alexpriceco' title='My Instagram photos'><Icon name='instagram' /></a>
              </div>
            </article> */}
          </CSSTransitionGroup>

          <CSSTransitionGroup
            component='section'
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionName={'core-animation'}
            className={`project-parent selected--${selectedProject} ${
              this.state.firstLoad ? ' animate-in' : ''}`}
            key='project-parent'
          >
            { this.renderProject(selectedProject) }
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}
