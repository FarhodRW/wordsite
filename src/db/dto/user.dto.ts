import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, BaseDtoGroup, BasePagingDto } from "./base.dto";

export class UserDtoGroup extends BaseDtoGroup {
  static LOGIN = 'login'
  static REGISTER = 'register'
}

export class UserDto extends BaseDto {
  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  name: string;

  @IsEmail({ groups: [UserDtoGroup.REGISTER, UserDtoGroup.LOGIN] })
  @IsString({ groups: [UserDtoGroup.REGISTER, UserDtoGroup.LOGIN] })
  email: string;


  @IsOptional({
    groups: [UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE, UserDtoGroup.LOGIN]
  })
  @MinLength(3, {
    groups: [UserDtoGroup.REGISTER, UserDtoGroup.UPDATE]
  })
  password: string;


  @IsOptional({
    groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
  })
  @IsString({
    groups: [UserDtoGroup.CREATE, UserDtoGroup.UPDATE]
  })
  avatar: string;

}


export class UserGetDto extends BasePagingDto {

}