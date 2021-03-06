import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class UserSigninInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
