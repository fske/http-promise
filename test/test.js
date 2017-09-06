const httppro = require('http-promise')

options = {
  hostname: "127.0.0.1",
  port: 80,
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  }
}

data = {
  "jsonrpc":"2.0",
  "params":""
}

async function test(options, data) = {
  console.log(await httppro.post(options, data))
}

test(options, data)
