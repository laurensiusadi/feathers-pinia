import { defineStore } from 'pinia'

interface SetupAuthOptions {
  feathersClient: any
  id?: string
  state?: Function
  getters?: { [k: string]: any }
  actions?: { [k: string]: any }
}

export function defineAuthStore(...args: [SetupAuthOptions] | [string, SetupAuthOptions]): any {
  const id = args.length === 2 ? args[0] : args[0].id || 'auth'
  const options = args.length === 2 ? args[1] : args[0]
  const {
    feathersClient,
    state = () => ({}),
    getters = {},
    actions = {},
  } = options

  /**
   * Default State
   */
  const defaultState = {
    isLoading: true,
    isAuthenticated: false,
    accessToken: null, // The auth0 and API accessToken
    payload: null, // accessToken payload
    error: null,
  }

  const defaultGetters = {
    feathersClient() {
      return feathersClient
    },
  }

  /**
   * Default Actions
   */
  const defaultActions = {
    async authenticate(authData: any) {
      try {
        const response = await feathersClient.authenticate(authData)
        Object.assign(this, { ...response, isAuthenticated: true })
        return this.handleResponse(response) || response
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(this as any).error = error
        return this.handleError(error as Error)
      }
    },
    /**
     * Overwrite this function to handle the response in your app.
     * @param response The response from authenticate()
     */
    handleResponse(response: any) {
      return response
    },
    /**
     * Overwrite this function to handle the error in your app.
     * @param error the error from authenticate()
     */
    handleError(error: Error) {
      return Promise.reject(error)
    },
    /**
     * For tracking first-load state. Used by the watcher, below.
     */
    setLoaded() {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(this as any).isLoading = false
    },
  }

  const useAuth = defineStore({
    id,
    state: () => Object.assign(defaultState, state()),
    getters: Object.assign(defaultGetters, getters),
    actions: Object.assign(defaultActions, actions),
  })
  return useAuth
}
