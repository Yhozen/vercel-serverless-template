import { IsOptional } from 'class-validator'

export class JobDTO {
  @IsOptional()
  title?: string
  @IsOptional()
  position?: string
}
