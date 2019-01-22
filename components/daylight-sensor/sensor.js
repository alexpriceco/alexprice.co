import SunCalc from './suncalc.js'
import { IP } from '../../config.js'
import axios from 'axios'

/* global localStorage, DOMException */
// developer.mozilla.org/en-US/
// docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable (type) {
  let storage = window[type]

  try {
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) && storage.length !== 0
  }
}

async function getStoredCoords () {
  return new Promise((resolve, reject) => {
    let promises = [localStorage.getItem('lat'), localStorage.getItem('lon')]

    Promise.all(promises).then((coords) => {
      if (typeof coords[0] !== 'number' || typeof coords[1] !== 'number') {
        getFreshCoords().then((newCoords) => {
          resolve({
            lat: newCoords[0],
            lon: newCoords[1]
          })
        })
      } else {
        resolve({
          lat: coords[0],
          lon: coords[1]
        })
      }
    })
  })
}

async function getFreshCoords () {
  return new Promise((resolve, reject) => {
    axios.get('https://ipinfo.io', {
      headers: { 'Authorizontaion': `Bearer ${IP}` }
    }).then(response => {
      if (!response.data) reject(new Error('No location data'))
      const { loc } = response.data
      resolve(loc.split(',').map(c => +c))
    }).catch(error => reject(error))
  })
}

function setFreshCoords (coords) {
  localStorage.setItem('lat', coords.lat)
  localStorage.setItem('lon', coords.lon)
}

function isItDaytime (coords) {
  if (coords) {
    const times = SunCalc.getTimes(new Date(), coords.lat, coords.lon)
    if (new Date() > times.dawn && new Date() < times.dusk) return true
    else return false
  } else {
    if (new Date().getHours() > 5 && new Date().getHours() < 18) return true
    else return false
  }
}

async function isDay () {
  return new Promise((resolve, reject) => {
    if (storageAvailable('localStorage')) {
      getStoredCoords().then((coords) => {
        if (coords.lat) resolve(isItDaytime(coords))
        else {
          getFreshCoords().then((freshCoords) => {
            setFreshCoords(freshCoords)
            resolve(isItDaytime(freshCoords))
          }).catch((e) => {
            console.error(e)
            resolve(false)
          })
        }
      })
    } else {
      getFreshCoords().then((freshCoords) => {
        resolve(isItDaytime(freshCoords))
      }).catch((e) => {
        console.error(e)
        resolve(false)
      })
    }
  })
}

export default isDay
