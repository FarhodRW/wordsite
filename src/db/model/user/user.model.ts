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

  @prop({})
  public password?: string;

  @prop({})
  public image?: string;

  @prop({})
  public googleId: string;

  @prop({})
  public facebookId: string
}

export const UserModel = getModelForClass(User);