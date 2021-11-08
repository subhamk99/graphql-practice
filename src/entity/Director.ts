import {Field, Int, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Movie } from "./Movie";


@ObjectType()
@Entity()
export class Director extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @OneToMany(()=> Movie,  movies => movies.director)
    @Field(()=>[Movie])
    movies: Promise<[Movie]>
}