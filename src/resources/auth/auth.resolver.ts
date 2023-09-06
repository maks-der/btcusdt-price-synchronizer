import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.dto';

@Resolver(() => AccessToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Query(() => AccessToken)
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AccessToken> {
    return this.authService.login(email, password);
  }

  @Mutation(() => AccessToken)
  public async register(
    @Args('fullName') fullName: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AccessToken> {
    return this.authService.register(fullName, email, password);
  }
}
