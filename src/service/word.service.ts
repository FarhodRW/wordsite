import { CommonService } from "./base.service";
import { WordModel } from "../db/model/word/word.model";

class WordService<T> extends CommonService<T> {

}

export const wordService = new WordService(WordModel);