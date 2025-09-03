import {
    NextRequest,
    NextResponse
} from 'next/server'
import { PrismaClient } from '@prisma/client'

// 不直接和数据库打交道
// prisma
import { prisma } from '@/lib/db'
