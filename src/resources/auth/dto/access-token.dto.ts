import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field()
  public accessToken: string;
}
