import { Category } from "src/category/entities/category.entity";
import { AbstractEntity } from "src/database/database.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('product')
export class Product extends AbstractEntity<Product> {
    @Column()
    name:string;

    @Column()
    price:number;

    @Column()
    discount:number;

    @Column()
    images:string;

    @Column()
    slug:string;

    @Column({ unique: true })
    barcode:string;

    @Column()
    expiry_date:Date;

    @Column()
    origin:string;

    @Column()
    weight_unit:string;

    @Column({nullable: true})
    description:string;

    @Column()
    quantity:number;

    @ManyToOne(() => Category,(category) => category.product)
    category: Category;





}
