import fetch from "node-fetch";

class CatFactService {

  /**
   * Fetch data from external api.
   * 
   * @param {string} path - The path of external api 
   * @returns {Promise} - Fetch promise
   */
  async getListFromAPI(path) {
    let uri = `${process.env.SOURCE_API}${path}`
    const res = await fetch(uri, {
      compress: true,
      timeout: 60e3, // 60s timeout as default
      follow: 0,
      headers: {
        'content-type': 'application/json'
      }
    })
    return res
  }
  
}

export default CatFactService