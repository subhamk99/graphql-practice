import { isAuth } from "../isAuth";
import {Arg,Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Director} from "../entity/Director";

@InputType()
class DirectorInput {
    @Field({nullable:true})
    name!: string;

    @Field({nullable:true})
    email!: string;

}

@InputType()
class DirectorUpdateInput {
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, {nullable: true})
    email?: string;
}

@Resolver()
export class DirectorResolver {
    @Mutation(() => Director)
    @UseMiddleware(isAuth)
    async createDirector(@Arg("directorInput", () => DirectorInput) directorInput: DirectorInput) {

        return await Director.create(directorInput).save();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateDirector(
        @Arg("id", () => Int) id: number,
        @Arg("directorUpdate", () => DirectorUpdateInput) directorUpdate: DirectorUpdateInput
    ) {
        await Director.update({id}, directorUpdate);
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteDirector(@Arg("id", () => Int) id: number) {
        await Director.delete({id});
        return true;
    }

    @Query(() => [Director])
    @UseMiddleware(isAuth)
    director(
    ) {
        return Director.find();
    }
}