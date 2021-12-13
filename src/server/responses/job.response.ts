import type { JobData } from 'server/models/job.model'

export type GetJob = {
  success: boolean
  data: JobData
}

export type GetAllJobs = {
  success: boolean
  data: JobData[]
}
