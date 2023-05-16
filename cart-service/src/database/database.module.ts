import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Carts } from "./entities/cart.entity";
import { CartItems } from "./entities/cart-item.entity";
import { Orders } from "./entities/order.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: ['dist/database/entities/*.entity{.ts,.js}'],
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        }),
        TypeOrmModule.forFeature([Carts, CartItems, Orders]),
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {}