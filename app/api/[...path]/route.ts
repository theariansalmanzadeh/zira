import { NextRequest, NextResponse } from 'next/server'

const API_ORIGIN = 'https://api.bonksaz.ir'

const HOP_BY_HOP = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
    'host',
    'content-length',
])

type RouteContext = {
    params: Promise<{ path: string[] }>
}

async function proxy(request: NextRequest, path: string[]) {
    const target = new URL(`/api/${path.join('/')}`, API_ORIGIN)
    target.search = request.nextUrl.search

    const headers = new Headers()
    request.headers.forEach((value, key) => {
        if (!HOP_BY_HOP.has(key.toLowerCase())) headers.set(key, value)
    })

    const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
    const upstream = await fetch(target, {
        method: request.method,
        headers,
        body: hasBody ? request.body : undefined,
        redirect: 'manual',
        ...(hasBody ? { duplex: 'half' } : {}),
    } as RequestInit)

    const responseHeaders = new Headers()
    upstream.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') return
        if (!HOP_BY_HOP.has(key.toLowerCase())) responseHeaders.set(key, value)
    })
    for (const cookie of upstream.headers.getSetCookie?.() ?? []) {
        responseHeaders.append('set-cookie', cookie)
    }

    return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: responseHeaders,
    })
}

async function handle(request: NextRequest, context: RouteContext) {
    const { path } = await context.params
    return proxy(request, path)
}

export const dynamic = 'force-dynamic'

export const GET = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
