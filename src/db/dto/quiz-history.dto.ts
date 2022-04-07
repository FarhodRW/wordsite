import { Transform } from "class-transformer";
import { IsEmail, IsNumber, isNumberString, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class QuizDtoGroup extends BaseDtoGroup {

}

export class QuizHistoryDto extends BaseDto {

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
  })
  totalScore: number;

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
  })
  rightScore: number;

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [QuizDtoGroup.CREATE, QuizDtoGroup.UPDATE]
  })
  wrongScore: number;
}


export class QuizHistoryGetDto extends BasePagingDto {
}