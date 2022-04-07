import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../../common/common.model";
import { BaseModel } from "../../baseModel";
import { Tag } from "../../tag/tag.model";
import { Types } from 'mongoose'
import { Word } from "../../word/word.model";
import { QuizHistory } from "../quiz-history.model";

class QuizVariants {

  @prop({ required: true, type: Types.ObjectId, ref: CollectionNames.WORDS })
  wordId: Ref<Word>;

  @prop({})
  name: string;

  @prop({ default: false })
  public isAnswer!: boolean;
}

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.QUIZ_ITEMS
  }
})
export class QuizItem extends BaseModel {

  @prop({ type: Types.ObjectId, ref: CollectionNames.QUIZ_HISTORY })
  quizHistoryId: Ref<QuizHistory>;

  @prop({ required: true, type: Types.ObjectId, ref: CollectionNames.WORDS })
  wordId: Ref<Word>;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public defination!: string;

  @prop({ default: [] })
  public tags: Ref<Tag>[];

  @prop({ default: true })
  public isPrivate: boolean;

  @prop({ default: false })
  isCorrect: boolean;

  @prop({ default: false })
  isAnswered: boolean;

  @prop({ _id: false, default: [], type: () => [QuizVariants] })
  variants: QuizVariants[]
}



export const QuizItemModel = getModelForClass(QuizItem);