import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Visiblity } from "../model/quiz/quiz-history.model";
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

  @IsOptional({
    groups: [WordDtoGroup.UPDATE, WordDtoGroup.CREATE]
  })
  @IsString({
    groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE]
  })
  pron: string;

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

  @IsOptional({ groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE] })
  @IsMongoId({
    groups: [WordDtoGroup.CREATE, WordDtoGroup.UPDATE],
  })
  category?: string;
}


export class WordGetDto extends BasePagingDto {
  @IsOptional({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  @IsString({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  createdBy?;

  @IsOptional({ groups: [BaseDtoGroup.GET_PAGING] })
  @IsEnum(Visiblity, {
    groups: [BaseDtoGroup.GET_PAGING],
    each: true
  })
  visiblity: Visiblity;

  @IsOptional({ groups: [BaseDtoGroup.GET_PAGING] })
  @IsDateString({ groups: [BaseDtoGroup.GET_PAGING] })
  dateFrom: Date;

  @IsOptional({ groups: [BaseDtoGroup.GET_PAGING] })
  @IsDateString({ groups: [BaseDtoGroup.GET_PAGING] })
  dateTo: Date;

  @IsOptional({ groups: [BaseDtoGroup.GET_PAGING] })
  @IsArray({
    groups: [BaseDtoGroup.GET_PAGING]
  })
  @IsMongoId({
    groups: [BaseDtoGroup.GET_PAGING],
    each: true
  })
  tagIds: string[];
}