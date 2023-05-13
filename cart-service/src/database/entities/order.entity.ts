import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid", nullable: true })
    userId: string;

    @Column({ type: "uuid", nullable: true })
    cartId: string;

    @Column({ type: "json", nullable: true })
    payment: string;

    @Column({ type: "json", nullable: true })
    delivery: string;

    @Column({ type: "text", nullable: true })
    comments: string;

    @Column({ type: "text", nullable: true })
    status: string;

    @Column({ type: "integer", nullable: true })
    total: number;
}