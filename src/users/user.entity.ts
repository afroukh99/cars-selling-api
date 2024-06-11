import { Exclude } from "class-transformer";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;




    @AfterInsert()
    logInsert () {
        console.log("inserted new user with id: " + this.id);
    }


}