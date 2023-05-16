import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Carts } from "./cart.entity";

@Entity()
export class CartItems {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid", nullable: true })
    cartId: string;

    @Column({ type: "uuid", nullable: true })
    productId: string;

    @Column({ type: "numeric", nullable: true })
    productPrice: number;

    @Column({ type: "smallint", nullable: true })
    count: number;

    @ManyToOne(() => Carts)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart: Carts;
}