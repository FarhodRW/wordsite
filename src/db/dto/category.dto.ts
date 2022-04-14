import { IsEmail, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class CategoryDtoGroup extends BaseDtoGroup {

}

export class CategoryDto extends BaseDto {
  @IsOptional({
    groups: [CategoryDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CategoryDtoGroup.CREATE, CategoryDtoGroup.UPDATE]
  })
  name: string;

  @IsMongoId({
    groups: [CategoryDtoGroup.UPDATE]
  })
  parentId?: string;
}


export class CategoryGetDto extends BasePagingDto {
  @IsOptional({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  @IsString({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  createdBy?: string;
}