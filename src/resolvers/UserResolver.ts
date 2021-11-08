import { compare, hash } from "bcryptjs";
import { User } from "../entity/User";
import { isAuth } from "../isAuth";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../config/Context";
import { createAccessToken } from "../config/auth";

@InputType()
class userInput {

    @Field()
    name:string;

    @Field()
    email:string;

    @Field()
    password:string;
}

@InputType()
class loginInput {

    @Field()
    email:string;

    @Field()
    password:string;
}

@ObjectType()
class LoginResponse {

    @Field()
    accessToken: string;

    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {

    @Query(() => User)
    @UseMiddleware(isAuth)
    async getUser(@Ctx() { payload }: MyContext) {
        return User.findOne({ where: { id: payload?.userId }});
    }

    @Mutation(() => String)
    async addUser(
        @Arg("userDetails", () => userInput) userDetails: userInput
    ){
        const hashedPassword = await hash(userDetails.password,13);
        try {
            const user = new User();
            user.name = userDetails.name;
            user.email = userDetails.email;
            user.password = hashedPassword;
            await user.save()
        } catch(err) {
            console.log(err);
            return "Error occurred while saving user";
        }
        return "User detail saved successfully!!";
    }

    @Mutation(() => LoginResponse)
    async Login(
        @Arg("login", () => loginInput)login: loginInput
        ): Promise<LoginResponse>{
            const email = login.email;
            const user = await User.findOne({where: { email }});

            if(!user) {
                throw new Error("Could not find user");
            }
            const validate = await compare(login.password,user.password);
            if(!validate) {
                throw new Error("Bad password");
            }

            return {
                accessToken: createAccessToken(user),
                user,
            };
        }

        @Mutation(() => Boolean)
        async logout() {
            return true;
        }

}
