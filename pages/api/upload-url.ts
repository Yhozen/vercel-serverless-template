import { Storage } from '@google-cloud/storage'
import Iron from '@hapi/iron'
import { VercelRequest, VercelResponse } from '@vercel/node'
import CookieService from 'helpers/cookie'

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
})

const bucket = storage.bucket(process.env.BUCKET_NAME)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const file = bucket.file(req.query.file as string)

  await Iron.unseal(
    CookieService.getAuthToken(req.cookies),
    process.env.ENCRYPTION_SECRET,
    Iron.defaults,
  ).catch(() => res.status(401).end())

  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  }

  const [response] = await file.generateSignedPostPolicyV4(options)

  res.status(200).json(response)
}
