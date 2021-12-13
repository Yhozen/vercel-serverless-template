import { IsNotEmpty } from 'class-validator'

import { JobDTO } from './job.dto'

export class UpdateJobDTO extends JobDTO {
  @IsNotEmpty()
  id: string
}
