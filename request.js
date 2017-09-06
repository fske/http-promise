var httpstandard = require("http")

var http = {}

http.post = function(options, data) {
  var content = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    var body = ""
    var req = httpstandard.request(options, function (res) {
      res.setEncoding('utf8')
      res.on('data', function(chunk) {
        body += chunk
      })
      res.on('end', function() {
        resolve(body)
      })
    })
    req.on('error', function(err) {
       if (err != undefined) {
         reject(err)
       }
    })
    req.write(content)
    req.end()
  }).then((chunk) => {
    return chunk
  }, (error) => {
    console.log(error)
  })
}

module.exports = http

if (require.main == module) {
  async function test() {
    console.log(await module.exports.post({
      hostname: '127.0.0.1',
      port: 80,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    },{
      "jsonrpc":"2.0",
      "params":"",
      "id":0
    }))
  }
  test()
}
