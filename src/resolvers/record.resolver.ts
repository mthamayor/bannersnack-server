import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  Query,
} from "type-graphql";
import IContext from "../interfaces/context.interface";
import Record from "../models/record.model";
import User from "../models/user.model";
import CreateRecordResponse from "../input-types/create-record.response";
import { authenticatedUser } from "../middlewares/authenticated-user.middleware";


@Resolver()
export class RecordResolver {
  @Mutation(() => [CreateRecordResponse])
  @UseMiddleware(authenticatedUser)
  async createRecord(
    @Ctx() { payload }: IContext,
    @Arg("title", () => String)
    title: string
  ): Promise<CreateRecordResponse[]> {
    const record = new Record({
      title,
      userId: payload!.id
    });

    await record.save();

    const fetchedRecord: CreateRecordResponse[] = await Record.findAll({ order: [['id', 'DESC']], include: [User] })

    return fetchedRecord;
  }

  @Query(() => [CreateRecordResponse])
  @UseMiddleware(authenticatedUser)
  async getRecords(): Promise<CreateRecordResponse[]> {
    const fetchedRecord: CreateRecordResponse[] = await Record.findAll({ order: [['id', 'DESC']], include: [User] })

    return fetchedRecord;
  }
}
