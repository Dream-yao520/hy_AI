import {
    NextRequest,
    NextResponse
} from 'next/server'
import {
    verifyToken,
    createTokens
} from '@/lib/jwt'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
    try {
        console.log('----------------------------')
        const refreshToken = request.cookies.get('refreshToken')?.value
        const redirectUrl = request.nextUrl.searchParams.get('redirect') || "/dashboard"
        if (!refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        const refreshPayload = await verifyToken(refreshToken)
        if (!refreshPayload || !refreshPayload.userId) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const userId = refreshPayload.userId as number
        // 刷新？ 数据库再校验一次
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user || user.refreshToken !== refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        } = await createTokens(userId)

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: newRefreshToken
            }
        })

        const response = NextResponse.redirect(new URL(redirectUrl, request.url))

        response.cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 15,
            sameSite: 'strict',
            path: '/'
        })
        response.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
            path: '/'
        })

        return response

    } catch (error) {
        console.error('Token refresh error', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}