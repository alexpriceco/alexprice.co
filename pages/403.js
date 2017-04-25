import React, { Component } from 'react'
import Head from 'next/head'
import Style from '../components/general/style'
import sheet from '../components/main.scss'

export default class Home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      launch_time: '',
      location: '',
      local_weather: 'COMING SOON',
      nightmode: false,
      longitude: '',
      latitude: '',
      selected: ''
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

  componentDidMount () {
    this.setState({ launch_time: new Date().toISOString() })

    // Determine if should default to nightmode
    if (new Date().getHours() < 6) this.setState({ nightmode: true })
    else if (new Date().getHours() > 19) this.setState({ nightmode: true })
    else this.setState({ nightmode: false })

    let DARK_SKY_KEY = 'ff0715e86494e35b1ae6adf7e4ebe667'

    this.get('https://jsonip.com').then((res) => {
      this.get(`https://freegeoip.net/json/${res.ip}`).then((res) => {
        if (res.city && res.region_name) {
          this.setState({ location: `${res.region_name}, ${res.city}` })
        } else {
          this.setState({ location: `${res.latitude}, ${res.longitude}` })
        }

        this.setState({
          latitude: res.latitude,
          longitude: res.longitude
        })

        let darkSkyURL = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/` +
          res.latitude + ',' + res.longitude

        console.log(darkSkyURL) // TODO: build a Node server to process this req
        // this.get(darkSkyURL).then((res) => {
        //   console.log(res)
        // })
      })
    }).catch((err) => {
      console.log('JSON IP failed to load, with error:', err)
    })
  }

  render () {
    const { nightmode } = this.state

    return (
      <div>
        <Head>
          <title>Alex Price > Product Designer</title>
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
          <section className='home'>
            <article>
              <h1>404</h1>
            </article>
          </section>
        </div>
      </div>
    )
  }
}
