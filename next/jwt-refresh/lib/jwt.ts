import {
    SignJWT,
    jwtVerify
} from 'jose'
import {
    cookies
} from 'next/headers'

const getJwtSecretKey = (() => {
    const secret = process.env.JWT_SECRET_KEY
    if (!secret) {
        throw new Error("JWT_SECRET_KEY is not set")
    }
    // 二进制secret
    return new TextEncoder().encode(secret)
})

export const createTokens = async (userId: number) => {
    const accessToken = await new SignJWT({ userId })
        // 创建JWT 载荷
        // 设置头部，指定使用HS256算法签名
        .setProtectedHeader({ alg: 'HS256' })
        // 颁发的时间 当前时间
        .setIssuedAt()
        // 设置过期时间为15min
        .setExpirationTime('15m')
        // 使用secret 签名
        .sign(getJwtSecretKey())
    const refreshToken = await new SignJWT({ userId })
        // 创建JWT 载荷
        // 设置头部，指定使用HS256算法签名
        .setProtectedHeader({ alg: 'HS256' })
        // 颁发的时间 当前时间
        .setIssuedAt()
        // 设置更长的过期时间
        .setExpirationTime('7d')
        // 使用secret 签名
        .sign(getJwtSecretKey())

    return {
        accessToken,
        refreshToken
    }
}

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies()
    cookieStore.set('accessToken', accessToken, {
        // 黑客XSS 攻击 js 试图获得cookie 
        httpOnly: true, //不能用js来操作cookie
        maxAge: 60 * 15,
        sameSite: 'strict',
        path: '/'
    })
    cookieStore.set('refreshToken', refreshToken, {
        // 黑客XSS 攻击 js 试图获得cookie 
        httpOnly: true, //不能用js来操作cookie
        maxAge: 60 * 60 * 24 * 7, // 7天
        sameSite: 'strict',
        path: '/'
    })
}


export const verifyToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey())
        return payload
    } catch (error) {
        return null
    }
}