import { getModelForClass, prop } from '@typegoose/typegoose'

export type JobData = {
  title?: string

  position?: string
}

class Job implements JobData {
  @prop()
  public title?: string

  @prop()
  public position?: string
  @prop()
  public owner: string
}

export const JobModel = getModelForClass(Job)
