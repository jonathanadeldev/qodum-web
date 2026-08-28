import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
    throw new Error('JWT_SECRET must be configured')
}

const secret = new TextEncoder().encode(jwtSecret)
if (secret.byteLength < 32) {
  throw new Error('JWT_SECRET must be at least 32 bytes when encoded')
}

export async function signToken(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as JWTPayload
    } catch {
        return null
    }
}