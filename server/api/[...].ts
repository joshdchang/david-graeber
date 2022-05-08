export default defineEventHandler(event => {
  return $fetch('https://davidcgraeber.com/' + event.req.url)
})