export interface requestProps {
   path: string
   method: 'GET' | 'POST' | 'PUT' | 'DELETE'
   body?: object
}

export interface requestResponse {
   error?: string | { type?: number, message: string }
   [key: string]: any
}

export interface authenticateProps {
   email: string,
   password: string
}

export interface setCookieProps {
   token: string
   maxAge: number
}
