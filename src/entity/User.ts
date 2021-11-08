import { Field, ObjectType,ID } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text", {nullable: true})
    name: string;

    @Field()
    @Column("text", {nullable: true})
    email: string;

    @Column("text", {nullable: true})
    password: string;
}
