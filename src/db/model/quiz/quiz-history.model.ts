import { getModelForClass, Index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";


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

  @prop({})
  finishingAt: Date;

  @prop({})
  timeLimit: number;

  @prop({})
  totalQuestions: number;

}

export const QuizHistoryModel = getModelForClass(QuizHistory);