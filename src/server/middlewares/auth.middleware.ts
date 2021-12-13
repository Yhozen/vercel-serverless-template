import Iron from '@hapi/iron'
import {
  createMiddlewareDecorator,
  NextFunction,
} from '@storyofams/next-api-decorators'
import CookieService from 'helpers/cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export const Auth = createMiddlewareDecorator(
  (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults,
    )
      .then(() => {
        next()
      })
      .catch(() => res.status(401).end())
  },
)
