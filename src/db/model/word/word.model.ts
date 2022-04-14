import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Category } from "../category/category.model";
import { Tag } from "../tag/tag.model";
import mongoose from "mongoose";

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
    name: 1
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

  @prop({ required: true })
  public defination!: string;

  @prop({ default: [] })
  public tags: Ref<Tag>[];

  @prop({ default: true })
  public isPrivate: boolean;

  @prop({ type: [String], enum: WordTypes })
  public type?: WordTypes[];

  @prop({
    type: mongoose.Types.ObjectId,
    ref: CollectionNames.CATEGORIES
  })
  public category?: Ref<Category>;

}

export const WordModel = getModelForClass(Word);