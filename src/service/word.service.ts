import { CommonService } from "./base.service";
import { WordModel } from "../db/model/word/word.model";

class WordService<T> extends CommonService<T> {

}

export const tagService = new WordService(WordModel);
