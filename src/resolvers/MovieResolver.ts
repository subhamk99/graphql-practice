import { isAuth } from "../isAuth";
import {Arg, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Movie} from "../entity/Movie";

@InputType()
class MovieInput {
    @Field({nullable:true})
    title!: string;

    @Field(() => Int,{nullable:true})
    minutes!: number;

    @Field(() => Int,{nullable:true})
    year!:number;
}

@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, {nullable: true})
    minutes?: number
}

@Resolver()
export class MovieResolver {
    @Mutation(() => Movie)
    @UseMiddleware(isAuth)
    async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
        const movie = await Movie.create(options).save();
        return movie;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateMovie(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
    ) {
        await Movie.update({id}, input);
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMovie(@Arg("id", () => Int) id: number) {
        await Movie.delete({id});
        return true;
    }

    @Query(() => [Movie])
    @UseMiddleware(isAuth)
    movies(
        @Arg("movie", ()=>MovieInput,{nullable:true}) movie:MovieInput
    ) {
        if(movie.title){
            return  [Movie.findOne({where:{title:movie.title}})];
        }
        if(movie.year){
             return Movie.find({where:{year:movie.year}})
        }
        else{
            return Movie.find();
        }
    }
}