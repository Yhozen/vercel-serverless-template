import { VercelRequest, VercelResponse } from '@vercel/node'
import { destroyCookie } from 'nookies'

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
  destroyCookie({ res }, 'authed', {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  destroyCookie({ res }, 'api_token', {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  res.end()
}
