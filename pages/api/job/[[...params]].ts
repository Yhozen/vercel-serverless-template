import {
  Body,
  createHandler,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@storyofams/next-api-decorators'
import { JobDTO } from 'server/dto/job/job.dto'
import { UpdateJobDTO } from 'server/dto/job/update-job.dto'
import { Auth } from 'server/middlewares/auth.middleware'
import { WithMongo } from 'server/middlewares/mongo.middleware'
import { JobData, JobModel } from 'server/models/job.model'
import {
  CurrentUser,
  MagicUser,
} from 'server/param-decorators/current-user.decorator'
import { GetAllJobs, GetJob } from 'server/responses/job.response'

class JobHandler {
  @WithMongo()
  @Get('/get/:id')
  async get(@Param('id') identifier: string): Promise<GetJob> {
    const job = await JobModel.findOne({ identifier })

    if (!job) throw new Error('no job')

    return { success: true, data: job }
  }

  @WithMongo()
  @Get('/getOwnJobs/')
  async getOwnJobs(@CurrentUser() user: MagicUser): Promise<GetJob> {
    const job = await JobModel.findOne({ owner: user.email })

    if (!job) throw new Error('no job')

    return { success: true, data: job }
  }
  @Auth()
  @WithMongo()
  @Post('/create')
  async createJob(
    @Body(ValidationPipe) body: JobDTO,
    @CurrentUser() user: MagicUser,
  ): Promise<JobData> {
    const person = await JobModel.create({ ...body, owner: user.email })

    return person
  }

  @Auth()
  @WithMongo()
  @Get('/all')
  async getAll(): Promise<GetAllJobs> {
    const jobs = await JobModel.find()

    return { success: true, data: jobs ?? [] }
  }

  @Auth()
  @WithMongo()
  @Post('/edit')
  async updateUser(@Body(ValidationPipe) body: UpdateJobDTO): Promise<boolean> {
    const { id, ...updateFields } = body

    await JobModel.updateOne({ _id: id }, updateFields)

    return true
  }

  @Auth()
  @WithMongo()
  @Post('/remove')
  async removeUser(@Body(ValidationPipe) body: UpdateJobDTO): Promise<boolean> {
    const { id } = body

    await JobModel.deleteOne({ _id: id })

    return true
  }
}

export default createHandler(JobHandler)
