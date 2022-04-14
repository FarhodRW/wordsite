import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";


export enum Visiblity {
  PUBLIC = 'public',
  PRIVATE = 'private',
  BOTH = 'both'
}




@modelOptions({
  schemaOptions: {
    collection: CollectionNames.QUIZ_HISTORY
  }
})

export class QuizHistory extends BaseModel {

  @prop({ default: 0 })
  public score?: number;

  @prop({ default: () => new Date() })
  startedAt?: Date;

  @prop({})
  finishedAt?: Date;
  @prop({ default: false })
  isFinished?: boolean;

  @prop({})
  finishingAt: Date;

  @prop({})
  timeLimit: number;

  @prop({})
  totalQuestions: number;

  @prop({ type: [String], enum: Visiblity })
  public visiblity?: Visiblity;

}

export const QuizHistoryModel = getModelForClass(QuizHistory);