import {
    NextRequest,
    NextResponse
} from 'next/server'
import {
    prisma
} from '@/lib/db'
import {
    emailRegex,
    passwordRegex
} from '@/lib/regexo'
import bcrypt from 'bcryptjs'
import {
    createTokens,
    setAuthCookies
} from '@/lib/jwt'

export async function POST(resquest: NextRequest) {
    try {
        const {
            email,
            password
        } = await resquest.json()
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json({
                error: `Email is invalid`
            }, {
                status: 400
            })
        }
        if (!password || !passwordRegex.test(password)) {
            return NextResponse.json({
                error: `Password is invalid`
            }, {
                status: 400
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return NextResponse.json({
                error: `User not found`
            }, {
                status: 401
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return NextResponse.json({
                error: `Password is invalid`
            }, {
                status: 401
            })
        }
        const { accessToken, refreshToken } = await createTokens(user.id)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        })

        setAuthCookies(accessToken, refreshToken)

        return NextResponse.json({
            message: 'Login successful'
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({
            error: 'Login failed'
        }, {
            status: 500
        })
    } finally {
        // 释放数据库对象
        await prisma.$disconnect()
    }
}