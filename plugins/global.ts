
export default defineNuxtPlugin(nuxtApp => {

  interface DirectusResponse {
    data: {};
  }
  interface KeyedResponses {
    [index: string]: object;
  }

  let directus: string = 'https://david-graeber.up.railway.app'
  let cache: { [index: string]: Promise<DirectusResponse> } = {}

  return {
    provide: {
      directus,
      api: async (collections: string[]): Promise<KeyedResponses>  => {

        let fetchPromises: Promise<DirectusResponse>[] = []

        for (let collection of collections) {
          if (cache[collection]) {
            fetchPromises.push(cache[collection])
          } else {
            let req: Promise<DirectusResponse> = $fetch(directus + '/items/' + collection)
            fetchPromises.push(req)
            cache[collection] = req
          }
        }
        
        let responses = await Promise.all(fetchPromises)
        let keyedResponses: KeyedResponses = {}
        for (let i in responses) {
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