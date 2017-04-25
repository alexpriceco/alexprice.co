import React from 'react'
import Head from 'next/head'
import scss from '../components/character/index.scss'
import * as firebase from 'firebase'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Navigation from '../components/character/navigation'
import Reference from '../components/character/sections/reference'
import Questlog from '../components/character/sections/quest-log'
import Inventory from '../components/character/sections/inventory'
import Abilities from '../components/character/sections/abilities'
import Notebook from '../components/character/sections/notebook'

if (!firebase.apps.length) {
  console.log('%cCreating a new firebase instance...', 'color: grey; font-style: italic;padding: 2px')

  let config = {
    apiKey: 'AIzaSyCM6-ZkljQSJAIP9GW83urxC3-2ahRwV8M',
    authDomain: 'playbook-9e0c7.firebaseapp.com',
    databaseURL: 'https://playbook-9e0c7.firebaseio.com',
    storageBucket: 'playbook-9e0c7.appspot.com',
    messagingSenderId: '41836465090'
  }

  firebase.initializeApp(config)
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedSection: 'notebook'
    }
  }

  static getInitialProps ({ query: { id } }) {
    return { id }
  }

  // FIREBASE STUFF // -------------
  authLink (firebase) {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')
    return firebase.auth().signInWithRedirect(provider)
  }

  checkForUser () {
    console.log('%cChecking for user...', 'color:grey;font-style:italic;padding:2px')

    new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user !== undefined) {
          let displayName = user.displayName
          let email = user.email
          let photoURL = user.photoURL
          let uid = user.uid
          resolve({ uid, displayName, email, photoURL })
        }
      })
    }).then(res => {
      this.setState({user: res})
      this.getCharacter().then(res => this.setState(res))
    }).catch(res => console.warn('User is not signed in.', res))
  }

  // DATA COLLECTION // -------------
  ajax (url, data) {
    data = (data === undefined) ? null : data

    return new Promise(function (resolve, reject) {
      let req = new window.XMLHttpRequest()
      req.onload = function () { resolve(this.responseText) }
      req.onerror = reject
      req.open('POST', url, true)
      req.setRequestHeader('Content-Type', 'Application/JSON')
      req.send(data)
    })
  }

  getCharacter () {
    let uid = this.state.user.uid
    let name = this.props.id

    return new Promise((resolve, reject) => {
      this.ajax(
        'https://playbook-dnd-api.herokuapp.com/api/getCharByName',
        JSON.stringify({uid, name})
      ).then(res => {
        let parsedRes = JSON.parse(res)
        if (Object.keys(parsedRes).length !== 0) {
          for (let charID in parsedRes) {
            resolve({'character': parsedRes[charID], charID})
          }
        } else {
          reject(false)
        }
      }, res => console.log('Promise was rejected, with the following reason', res))
      .catch(e => console.warn('That\'s not gone well!', e))
    })
  }

  // RENDERING // -------------
  componentDidMount () {
    this.checkForUser()
  }

  componentDidUpdate () {
    console.log('STATE', this.state)
  }

  renderSection () {
    if (this.state.character) {
      switch (this.state.selectedSection) {
        case 'reference': return <div className='sectionContainer'>
          <Reference {...this.state} /></div>
        case 'questlog': return <div className='sectionContainer'>
          <Questlog {...this.state} /></div>
        case 'inventory': return <div className='sectionContainer'>
          <Inventory {...this.state} /></div>
        case 'abilities': return <div className='sectionContainer'>
          <Abilities {...this.state} /></div>
        default: return <div className='sectionContainer'>
          <Notebook {...this.state} /></div>
      }
    } else { // TODO: add loading screen
      return <div className='loading-screen'><h3>LOADING</h3></div>
    }
  }

  render () {
    return (<div>
      <Head>
        <title>Playbook Beta</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <style dangerouslySetInnerHTML={{__html: scss}} />

      <div className='top-nav'>
        <h3>{this.state.character ? this.state.character.name : null}</h3>
      </div>

      <ReactCSSTransitionGroup component='div'
        transitionName={'sectionMove' + (Math.floor(Math.random() * 2) === 1 ? 'Alt' : '')}
        transitionEnterTimeout={300} transitionLeaveTimeout={300} >
        { React.cloneElement(this.renderSection(), { key: `key--${new Date()}` }) }
      </ReactCSSTransitionGroup>

      <Navigation selected={this.state.selectedSection}
        navigateTo={(section) => this.setState({selectedSection: section})} />
    </div>)
  }
}
