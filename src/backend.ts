import axios from "axios"

export interface WebTokens {
    access_token: string
    refresh_token: string
}

export interface JwtPayload {
    iat: number
    exp: number
}

export interface JwtWithTokens {
    access_token: JwtPayload & { token: string }
    refresh_token: JwtPayload & { token: string }
}

export const hostname = "localhost:8105"

export const api = axios.create({ baseURL: `http://${hostname}` })

export const refreshToken = async (refresh_token: string) => {
    try {
        const response = await api.post<WebTokens>("/auth/refresh", { refresh_token })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const isAccessTokenExpired = (jwt: JwtWithTokens) => {
    return Date.now() >= jwt.access_token.exp * 1000
}

const isRefreshTokenExpired = (jwt: JwtWithTokens) => {
    return Date.now() >= jwt.refresh_token.exp * 1000
}

const handleTokenExpiration = async (jwt: JwtWithTokens, refreshTokenFn: (tokens: WebTokens) => void, logout: () => void) => {
    if (isAccessTokenExpired(jwt)) {
        if (isRefreshTokenExpired(jwt)) {
            logout()
            return
        }

        api.interceptors.request.clear()
        const newTokens = await refreshToken(jwt.refresh_token.token)
        if (newTokens) {
            refreshTokenFn(newTokens)
        }
    }
}

export const handleInterceptions = async (
    jwt: React.RefObject<JwtWithTokens | null>,
    refreshTokenFn: (tokens: WebTokens) => void,
    logout: () => void
) => {
    api.interceptors.request.use(async (config) => {
        if (!jwt.current) return config

        await handleTokenExpiration(jwt.current, refreshTokenFn, logout)

        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${jwt.current?.access_token.token}`
        }

        return config
    })
}
