import { Arg, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { UserModel } from "../entity/User";
import { AuthInput } from "../types/AuthInput";
import { UserResponce } from "../types/UserResponce";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponce)
  async register(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponce> {
    const existingsUser = await UserModel.findOne({ email });

    if (existingsUser) {
      throw new Error("Email alredy in use");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || "");

    return { user, token };
  }
}
