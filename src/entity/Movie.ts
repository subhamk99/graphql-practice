import {Field, Int, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Director } from "./Director";


@ObjectType()
@Entity()
export class Movie extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => Int)
    @Column("int", { default: 60 })
    minutes: number;

    @Field(()=> Int)
    @Column("int")
    year:number;

    @ManyToMany(()=> Director, director => director.movies)
    @Field(()=>Director)
    director: Promise<Director>
}