import SunCalc from './suncalc.js'

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
    Promise.all(promises).then((coordinates) => {
      resolve({
        lat: coordinates[0],
        lon: coordinates[1]
      })
    })
  })
}

function setFreshCoords (coords) {
  localStorage.setItem('lat', coords.lat)
  localStorage.setItem('lon', coords.lon)
}

async function getFreshCoords () {
  /* global XMLHttpRequest */
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()
    request.open('GET', 'https://freegeoip.net/json', true)
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const res = JSON.parse(request.responseText)
        resolve({
          lat: res.latitude,
          lon: res.longitude
        })
      } else {
        const e = new Error(`Request status is ${request.status}`)
        return reject(e)
      }
    }
    request.send()
  })
}

function isItDaytime (coords, callback) {
  const times = SunCalc.getTimes(new Date(), coords.lat, coords.lon)
  if (new Date() > times.dawn && new Date() < times.dusk) return true
  else return false
}

module.exports = {
  isDay: async () => {
    return new Promise((resolve, reject) => {
      if (storageAvailable('localStorage')) {
        getStoredCoords().then((coords) => {
          if (coords.lat) resolve(isItDaytime(coords))
          else {
            getFreshCoords().then((freshCoords) => {
              setFreshCoords(freshCoords)
              resolve(isItDaytime(freshCoords))
            })
          }
        })
      } else {
        getFreshCoords().then((freshCoords) => {
          resolve(isItDaytime(freshCoords))
        })
      }
    })
  }
}
