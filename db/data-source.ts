import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../src/users/entities/user.entity";
import { Blog } from "../src/blogs/entities/blog.entity";
import { config } from "dotenv";
import { Comment } from "../src/comments/entities/comment.entity";

// .env config 
config({ path: ".env" });


// data source options 
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    entities: [User, Blog, Comment],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;