async function asyncImages (images, stacktrace) {
  try {
    console.info(images)
    if (!images) {
      console.log('No images in set, or set is undefined', images, stacktrace)
      return
    }
    for (let img of images) {
      img.className += ' loading'
      // eslint-disable-next-line
      const newImage = new Image()
      newImage.onload = () => {
        img.className = img.className.replace(' loading', '')
        img.src = newImage.src
      }

      newImage.src = img.src.replace('-min', '')
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = asyncImages
