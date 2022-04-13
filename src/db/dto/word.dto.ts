import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Tag } from "../model/tag/tag.model";
import { WordTypes } from "../model/word/word.model";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class WordDtoGroup extends BaseDtoGroup {

}

// class Tags {
//   @IsMongoId({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
//   @IsString({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
//   tag
// }


export class WordDto extends BaseDto {
  @IsOptional({
    groups: [WordDtoGroup.UPDATE]
  })
  @IsString({
    groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE]
  })
  name: string;

  @IsString({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
  defination: string;

  @IsArray({
    groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE]
  })
  @IsString({
    groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE],
    each: true
  })
  tags: any[];

  @IsBoolean({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
  isPrivate: boolean

  @IsOptional({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
  @IsEnum(WordTypes, {
    groups: [WordDtoGroup.UPDATE, WordDtoGroup.CREATE],
    each: true
  })
  types: WordTypes[];

}


export class WordGetDto extends BasePagingDto {
  @IsOptional({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  @IsString({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  createdBy?;
}