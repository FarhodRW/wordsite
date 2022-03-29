import { Transform } from "class-transformer";
import { IsEmail, IsNumber, isNumberString, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class ScoreDtoGroup extends BaseDtoGroup {

}

export class ScoreDto extends BaseDto {

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [ScoreDtoGroup.CREATE, ScoreDtoGroup.UPDATE]
  })
  totalScore: number;

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [ScoreDtoGroup.CREATE, ScoreDtoGroup.UPDATE]
  })
  rightScore: number;

  @Transform(({ value }) => isNumberString(value) ? Number(value) : value)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  }, {
    groups: [ScoreDtoGroup.CREATE, ScoreDtoGroup.UPDATE]
  })
  wrongScore: number;
}


export class ScoreGetDto extends BasePagingDto {

}