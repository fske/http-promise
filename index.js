var httpstandard = require("http")

var http = {}

http.get = function(url) {
  return new Promise((resolve, reject) => {
    var body = ""
    var req = httpstandard.get(url, (res) => {
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve(body)
      })
    })
    req.on('error', (err) => {
      if (err != undefined) {
        reject(err)
      }
    })
  }).then((body) => {
    return body
  }, (err) => {
    console.log("error", err)
  })
}
 
http.post = function(options, data) {
  var content = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    var body = ""
    var req = httpstandard.request(options, (res) => {
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve(body)
      })
    })
    req.on('error', (err) => {
       if (err != undefined) {
         reject(err)
       }
    })
    req.write(content)
    req.end()
  }).then((body) => {
    return body
  }, (err) => {
    console.log("error", err)
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
    console.log(await module.exports.get("http://www.un.org/zh/sections/un-charter/preamble/index.html"))
  }
  test()
}
