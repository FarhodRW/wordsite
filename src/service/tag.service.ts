import { CommonService } from "./base.service";
import { TagModel } from "../db/model/tag/tag.model";

class TagService<T> extends CommonService<T> {

}

export const tagService = new TagService(TagModel);
