import { getModelForClass, Index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.USERS
  }
})

@Index(
  {
    email: 1
  },
  {
    name: 'email',
    unique: true,
    background: true,
    partialFilterExpression: {
      isDeleted: false
    }
  }
)

export class User extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({})
  public image?: string;

}

export const UserModel = getModelForClass(User);