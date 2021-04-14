const someHost = "https://examples.cloudflareworkers.com/demos"
const url = someHost + "/static/json"

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  } else if (contentType.includes("application/text")) {
    return await response.text()
  } else if (contentType.includes("text/html")) {
    return await response.text()
  } else {
    return await response.text()
  }
}

async function handleRequest() {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400"
    },
  }
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, init)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})