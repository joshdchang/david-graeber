export default defineNuxtPlugin(nuxtApp => {

  let directus = 'https://david-graeber.up.railway.app'

  return {
    provide: {
      directus,
      api: async (collections) => {
        let fetchPromises = []
        for (let collection of collections) {
          fetchPromises.push($fetch(directus + '/items/' + collection))
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