import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNumber, isNumberString, IsOptional, IsString, ValidateNested } from "class-validator";
import { Visiblity } from "../model/quiz/quiz-history.model";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class QuizCreateDtoGroup extends BaseDtoGroup {

}



export class QuizCreateDto extends BaseDto {
  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [QuizCreateDtoGroup.CREATE]
  })
  @IsOptional({ groups: [QuizCreateDtoGroup.CREATE] })
  size?: number;

  // @IsOptional({ groups: [QuizCreateDtoGroup.CREATE] })
  // @IsBoolean({ groups: [QuizCreateDtoGroup.CREATE] })
  // isPrivate?: boolean
  @IsOptional({ groups: [QuizCreateDtoGroup.CREATE] })
  @IsEnum(Visiblity, {
    groups: [QuizCreateDtoGroup.CREATE],
    each: true
  })
  visiblity: Visiblity;

  @IsOptional({ groups: [QuizCreateDtoGroup.CREATE] })
  @IsDateString({ groups: [QuizCreateDtoGroup.CREATE] })
  dateFrom: Date;

  @IsOptional({ groups: [QuizCreateDtoGroup.CREATE] })
  @IsDateString({ groups: [QuizCreateDtoGroup.CREATE] })
  dateTo: Date;

  @IsOptional({ groups: [QuizCreateDtoGroup.CREATE] })
  @IsArray({
    groups: [QuizCreateDtoGroup.CREATE]
  })
  @IsMongoId({
    groups: [QuizCreateDtoGroup.CREATE],
    each: true
  })
  tagIds: string[];


}


export class QuizCreateGetDto extends BasePagingDto {

}