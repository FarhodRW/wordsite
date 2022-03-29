import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class TagDtoGroup extends BaseDtoGroup {

}

export class TagDto extends BaseDto {
  @IsOptional({
    groups: [TagDtoGroup.UPDATE]
  })
  @IsString({
    groups: [TagDtoGroup.CREATE, TagDtoGroup.UPDATE]
  })
  name: string;


}


export class TagGetDto extends BasePagingDto {

}