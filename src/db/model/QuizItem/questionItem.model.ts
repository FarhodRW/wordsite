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

export class QuizItem extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public isAnswer!: boolean;

  @prop({ default: false })
  public isFound?: boolean;
}



export const QuizItemModel = getModelForClass(QuizItem);