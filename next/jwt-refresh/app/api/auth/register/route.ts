import {
    NextRequest,
    NextResponse
} from 'next/server'
import { PrismaClient } from '@prisma/client'
// 不直接和数据库打交道
// prisma
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

// resutful
// 匹配规则，符号数学
// .通配符，什么都匹配，匹配一个
// +一次或多次
// @ email 必须要有的字符
// .+@  在@前面至少要有一个字符
// \. 一定要有一个.     3387210184@qq.com
import {
    emailRegex,
    passwordRegex
} from '@/lib/regexo'

export async function POST(request: NextRequest) {
    // 容错处理 稳定为主
    try {
        const {
            email,
            password
        } = await request.json()
        // 正则
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

        // 检测用户名已经注册？
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({
                error: 'Email already registered'
            }, {
                status: 409
            })
        }

        // 密码的单项加密
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json({
            message: 'Registration successful'
        }, {
            status: 201
        })
    } catch (err) {
        return NextResponse.json({
            error: 'Registration failed'
        }, {
            status: 500
        })
    } finally {
        // 释放数据库对象
        await prisma.$disconnect()
    }
}
