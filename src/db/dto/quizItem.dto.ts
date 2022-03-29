import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Tag } from "../model/tag/tag.model";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class QuizItemDtoGroup extends BaseDtoGroup {

}

// class Tags {
//   @IsMongoId({ groups: [QuizItemDtoGroup.CREATE, QuizItemDtoGroup.UPDATE] })
//   @IsString({ groups: [QuizItemDtoGroup.CREATE, QuizItemDtoGroup.UPDATE] })
//   tag
// }


export class QuizItemDto extends BaseDto {
  @IsOptional({
    groups: [QuizItemDtoGroup.UPDATE]
  })
  @IsString({
    groups: [QuizItemDtoGroup.CREATE, QuizItemDtoGroup.UPDATE]
  })
  name: string;

  @IsMongoId({
    groups: [QuizItemDtoGroup.CREATE, QuizItemDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [QuizItemDtoGroup.UPDATE]
  })
  @IsString({
    groups: [QuizItemDtoGroup.CREATE, QuizItemDtoGroup.UPDATE]
  })
  _id: string;

  @IsOptional({
    groups: [QuizItemDtoGroup.UPDATE]
  })
  @IsBoolean({
    groups: [QuizItemDtoGroup.CREATE, QuizItemDtoGroup.UPDATE]
  })
  isFound: boolean;


}


export class QuizItemGetDto extends BasePagingDto {

}