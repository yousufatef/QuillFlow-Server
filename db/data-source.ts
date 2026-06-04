import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../src/users/entities/user.entity";
import { Product } from "../src/products/entities/product.entity";
import { Review } from "../src/reviews/entities/review.entity";
import { config } from "dotenv";

// .env config 
config({ path: ".env" });


// data source options 
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    entities: [User, Product, Review],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;