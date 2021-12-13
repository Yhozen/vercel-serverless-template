import Iron from '@hapi/iron'
import { VercelRequest, VercelResponse } from '@vercel/node'
import CookieService from 'helpers/cookie'

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults,
    )

    // now we have access to the data inside of user
    // and we could make database calls or just send back what we have
    // in the token.
    res.json(user)
  } catch (error) {
    res.status(401).end()
  }
}
