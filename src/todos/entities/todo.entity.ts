import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todos")
export class Todo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    task:string;

    @Column()
    userId:number

    @Column()
    time:string;

}
