import { compare, hash } from "bcryptjs";
import {
  Resolver,
  Mutation,
  Arg,
  Query,
} from "type-graphql";
import UserSigninInput from "../input-types/user-signin.input";
import UserSignupInput from "../input-types/user-signup.input";
import { User } from "../models/user.model";
import CustomUtils from "../utils";
import AuthResponse from "../input-types/auth.response";

@Resolver()
export class UserResolver {
  @Mutation(() => AuthResponse)
  async signupUser(
    @Arg("data", () => UserSignupInput) data: UserSignupInput,
  ): Promise<AuthResponse> {
    const {
      firstName,
      lastName,
      email,
      password,
    } = data;

    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashed = await hash(password, 10);

    const user = new User({
      firstName: CustomUtils.capitalize(firstName),
      lastName: CustomUtils.capitalize(lastName),
      email: email.toLowerCase(),
      password: hashed,
    });

    await user.save();

    return CustomUtils.getAuthResponse(user);
  }

  @Mutation(() => String)
  async resetUserPassword(
    @Arg("data", () => UserSigninInput) data: UserSigninInput,
  ): Promise<string> {
    const {
      email,
      password,
    } = data;

    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const hashed = await hash(password, 10);

    existingUser.password = hashed;

    await existingUser.save();

    return "Password reset successful";
  }

  @Query(() => AuthResponse)
  async signinUser(
    @Arg("data", () => UserSigninInput) data: UserSigninInput,
  ): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid username or password");
    }

    return CustomUtils.getAuthResponse(user);
  }
}
