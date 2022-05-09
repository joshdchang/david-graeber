export default defineNuxtPlugin(nuxtApp => {

  let directus = 'https://david-graeber.up.railway.app'
  let cache = {}

  return {
    provide: {
      directus,
      api: async (collections) => {
        let fetchPromises = []
        for (let collection of collections) {
          if (cache[collection]) {
            fetchPromises.push(cache[collection])
          } else {
            let req = $fetch(directus + '/items/' + collection)
            fetchPromises.push(req)
            cache[collection] = req
          }
        }
        let responses = await Promise.all(fetchPromises)
        let keyedResponses = {}
        for (let i = 0; i < responses.length; i++) {
          keyedResponses[collections[i]] = responses[i].data
        }
        return keyedResponses
      },
      scrollTop: () => {
        if (typeof window.scrollTo === 'function') {
          window.scrollTo(0, 0)
        }
      }
    }
  }
})