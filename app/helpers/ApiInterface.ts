import axios, {AxiosInstance} from 'axios'
import {attach as raxAttach} from 'retry-axios'

const singleton = Symbol()
const singletonEnforcer = Symbol()


class ApiInterface {
   session: AxiosInstance

   constructor(enforcer) {
      // let apiToken = '';
      // if (data){
      //     data = JSON.parse(data)
      //     apiToken = data.apiToken;
      // }
      if (enforcer !== singletonEnforcer) {
         throw new Error('Cannot construct singleton')
      }
      this.session = axios.create({
         baseURL: 'https://scdn.dev/api',
         headers: {
            'Accept': 'application/json'
         }
      })
      this.session.defaults.timeout = 20 * 1000
      this.session.defaults.validateStatus = (status) => (status >= 200 && status < 300)
      // @ts-ignore
      this.session.defaults.raxConfig = {
         instance: this.session,
         retry: 3,
         noResponseRetries: 3,
         httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
         retryDelay: 500,
         statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
         onRetryAttempt: (err) => {

         }
      }
      raxAttach(this.session)
      this.session.interceptors.response.use(
         response => {
            return response
         },
         error => {
            return Promise.reject(error)
         }
      )

      this.session.interceptors.request.use(request => {
         //console.log('OkHttp: Starting Request', request);
         return request
      })


   }

   static get instance(): ApiInterface {
      // Try to get an efficient singleton
      this[singleton] = new ApiInterface(singletonEnforcer)

      return this[singleton]
   }

   // @ts-ignore
   get = (...params) => this.session.get(...params)
   // @ts-ignore
   post = (...params) => this.session.post(...params)
   // @ts-ignore

   put = (...params) => this.session.put(...params)
   // @ts-ignore

   patch = (...params) => this.session.patch(...params)
   // @ts-ignore

   remove = (...params) => this.session.delete(...params)
   login = (params) => this.session.post('/login', params)
}

export default ApiInterface
