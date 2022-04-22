import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Category } from "../category/category.model";
import { Tag } from "../tag/tag.model";

export enum WordTypes {
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PRONOUN = 'pronoun'
}


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.WORDS
  }
})

@Index(
  {
    name: 1,
    createdBy: 1,
    types: 1
  },
  {
    name: 'name',
    unique: true,
    background: true,
    partialFilterExpression: {
      isDeleted: false
    }
  }
)

export class Word extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({})
  public pron: string;

  @prop({ required: true })
  public defination!: string;

  @prop({ default: [] })
  public tags: Ref<Tag>[];

  @prop({ default: true })
  public isPrivate: boolean;

  @prop({ type: [String], enum: WordTypes })
  public types?: WordTypes[];

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.CATEGORIES
  })
  public category?: Ref<Category>;

}

export const WordModel = getModelForClass(Word);