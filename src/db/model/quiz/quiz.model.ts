import { getModelForClass, Index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.SCORES
  }
})

// @Index(
//   {
//     name: 1
//   },
//   {
//     name: 'name',
//     unique: true,
//     background: true,
//     partialFilterExpression: {
//       isDeleted: false
//     }
//   }
// )

export class Score extends BaseModel {
  @prop({ required: true })
  public totalScore!: number;

  @prop({ required: true })
  public rightScore!: number;

  @prop({ required: true })
  public wrongScore!: number;



}

export const ScoreModel = getModelForClass(Score);