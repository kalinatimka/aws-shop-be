import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItems } from "./cart-item.entity";

@Entity()
export class Carts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid", nullable: false })
    userId: string;

    @Column({ type: "date", nullable: false })
    createdAt: string;

    @Column({ type: "date", nullable: false })
    updatedAt: string;

    @Column({ type: "text", nullable: true })
    status: string;

    @OneToMany(() => CartItems, (cartItem) => cartItem.cart)
    @JoinColumn({ name: "id", referencedColumnName: "cart_id" })
    items: CartItems[];
}