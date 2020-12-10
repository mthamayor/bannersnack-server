import { Query, Resolver } from "type-graphql";

@Resolver()
export class IndexResolver {
  @Query(() => String)
  index() {
    return "/";
  }
}
