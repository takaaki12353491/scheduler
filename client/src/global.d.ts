declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly REACT_APP_API_URL: string
    readonly REACT_APP_AUTH0_DOMAIN: string
    readonly REACT_APP_AUTH0_CLIENT_ID: string
  }
}