import { Expose, Transform } from "class-transformer";
import { IsNumber, IsNumberString, isNumberString, IsOptional, IsString } from "class-validator";


export class BaseDtoGroup {
  static CREATE = 'create'
  static UPDATE = 'update'
  static GET_PAGING = 'get-paging'
  static CHOOSE = 'choose'
}

export class BaseDto {
  createdBy?: any;
}

export class BasePagingDto {
  @Expose({ toClassOnly: true })
  @Transform(({ value }) => {
    if (isNumberString(value)) return +value;
    return value;
  })
  @IsNumber({}, {
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  page: number = 1;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => {
    if (isNumberString(value)) return +value;
    return value;
  })
  @IsNumber({}, {
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  limit: number;

  @IsOptional({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  @IsString({
    groups: [BaseDtoGroup.GET_PAGING, BaseDtoGroup.CHOOSE]
  })
  search?: string;
  createdBy?;
}
