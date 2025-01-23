import { parse, serialize } from 'cookie';
import { 
   requestProps, 
   requestResponse,
   authenticateProps,
   setCookieProps
} from './interfaces/ApiClientInterface'

class ApiClient {
   public authCookieName: string
   public token: string | undefined
   public apiBase: string
   
   constructor() {
      this.authCookieName = process.env.REACT_APP_AUTH_COOKIE_NAME || 'authToken'
      this.token = parse(document.cookie)?.[this.authCookieName];
      this.apiBase = process.env.REACT_APP_API_BASE || ''
   }

   async request(opt: requestProps): Promise<requestResponse> {
      let result: requestResponse
      let status: number

      try {
         result = await fetch(`${this.apiBase}${opt.path}`, {
            method: opt.method,
            headers: {
               'Content-Type': 'application/json',
               'Authorization': this.token ? `Bearer ${this.token}` : '' 
            },
            body: opt.body ? JSON.stringify(opt.body) : undefined
         });

         status = result.status
         result = await result.json()

         if(status < 200 || status >= 300) {
            throw new Error(typeof result.error === 'string' ? 
               result.error : 
               (result.error?.message || 'An unknown error occurred')
            )
         }
      } catch (e: any) {
         result = {
            error: {
               type: e.type,
               message: e.message
            }
         }
      }

      return result
   }

   async authenticate(opt: authenticateProps): Promise<requestResponse> {
      const res = await this.request({
         path: '/api/auth',
         method: 'POST',
         body: {email: opt.email, password: opt.password}
      })

      if(res.auth?.token) {
         this.setToken({ token: res.auth.token, maxAge: res.auth.maxAgeMs / 1000 })
      }

      return res
   }

   logOut() {
      this.removeToken()
      return { success: true }
   }

   async fetchUser(): Promise<requestResponse>  {
      return await this.request({
         path: '/api/me',
         method: 'GET'
      })
   }

   setToken(opt: setCookieProps) {
      this.token = opt.token
      const cookieString = serialize(this.authCookieName, this.token, {
         maxAge: opt.maxAge,
         path: '/'
      })
      document.cookie = cookieString
   }

   removeToken() {
      this.token = ''
      const cookieString = serialize(this.authCookieName, '', {
         maxAge: 0,
         path: '/'
      })
      document.cookie = cookieString
   }
   
}

const apiClient = new ApiClient();
export default apiClient 
