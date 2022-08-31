import { ObjectType, Field } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
export class UserResponce {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
