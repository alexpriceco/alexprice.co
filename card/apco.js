document.addEventListener('DOMContentLoaded', function() {
    var feed = new Instafeed({
        get: 'user',
        userId: 1430427422,
        accessToken: '1430427422.1677ed0.9b3de598bab540e2b406bb3902434ff8',
        limit: 12,
        mock: true,
        success: function(data) {
            randomizeInsta(data)
        }
    })
    feed.run()
}, false)

function getUniqueInt(min, max, pre) {
    var result = Math.floor(Math.random() * (max - min + 1)) + min
    if (pre.indexOf(result) != -1)  result = getUniqueInt(min, max, pre)
    return result
}

function getRand(min, max) {
    var result = (Math.random() * (max - min) + min)
    result = +(Math.round(result + "e+2")  + "e-2")
    console.log(result)
    return result
}

function randomizeInsta(data) {
    var html = document.documentElement
    var body = document.body

    var height = Math.max( body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight,
                           html.offsetHeight )
    var width = Math.max( body.scrollWidth, body.offsetWidth,
                          html.clientWidth, html.scrollWidth,
                          html.offsetWidth )

    console.log(height, width)

    var rows = Math.ceil(height/(width/8))
    var cols = 8

    for ( var i = rows*8; i > 0; i--) {
        document.getElementById('instafeed')
            .appendChild(document.createElement('div'))
            .className = 'box'
    }

    var toInsert = []
    var filled = []
    var boxes = document.getElementsByClassName('box')

    // add urls to toInsert
    for ( var i = 0; i < 12; i++) {
        toInsert.push(data['data'][i]['images']['standard_resolution']['url'])
    }

    window.setTimeout(function() {
        while (toInsert.length != 0) {
            var rand = getUniqueInt(1, cols*rows, filled)
            filled.push(rand)
            boxes[(rand-1)].className = 'box fadeIn'
            boxes[(rand-1)].setAttribute('style', 'background: url('+toInsert[toInsert.length-1]+'); background-size: cover; -webkit-transition-delay: '+getRand(0.2, 2)+'s; transition-delay: '+getRand(0.2, 2)+'s')
            toInsert.pop()
        }
    }, 100)
}
