import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsMongoId, IsOptional, IsString, ValidateNested } from "class-validator";
import { Tag } from "../model/tag/tag.model";
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

}


export class WordGetDto extends BasePagingDto {

}