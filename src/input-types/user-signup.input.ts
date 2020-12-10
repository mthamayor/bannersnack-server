import { IsAlpha, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class UserSignupInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsAlpha()
    firstName: string;

    @Field()
    @IsAlpha()
    lastName: string;

    @Field()
    password: string;
}
