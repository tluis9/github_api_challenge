import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt'

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    userTag: string;

    @Column({ nullable: true })
    followers: number;

    @Column({ nullable: true })
    following: number;

    @Column({ nullable: true })
    repos: number;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    twitter: string;

    @Column({ nullable: true })
    company: string;

    @Column({ nullable: true })
    site: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @DeleteDateColumn()
    deletedAt: string;

    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }
}
