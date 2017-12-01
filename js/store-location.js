// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable (type) {
  try {
    var storage = window[type],
        x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  }
  catch (e) {
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
