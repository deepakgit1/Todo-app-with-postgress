import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userauth")
export class UserAuth{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;
    @Column()
    password:string
}