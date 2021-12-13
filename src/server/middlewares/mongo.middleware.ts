import {
  createMiddlewareDecorator,
  NextFunction,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'server/db/mongo'

export const WithMongo = createMiddlewareDecorator(
  (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    dbConnect()
      .then(() => next())
      .catch(next)
  },
)
