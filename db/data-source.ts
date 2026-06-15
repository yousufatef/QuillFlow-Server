import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../src/users/entities/user.entity";
import { Blog } from "../src/blogs/entities/blog.entity";
import { config } from "dotenv";
import { Comment } from "../src/comments/entities/comment.entity";
import { Category } from "../src/categories/entities/category.entity";
import { Role } from "../src/roles/entities/role.entity";
import { Permission } from "../src/permissions/entities/permission.entity";
import { RolePermission } from "../src/roles/entities/role-permission.entity";

// .env config 
config({ path: process.env.NODE_ENV !== "production" ? `.env.${process.env.NODE_ENV || "development"}` : ".env" });

// If DATABASE_URL is not in the loaded env file but is in the root .env, load it as fallback
if (!process.env.DATABASE_URL) {
    config({ path: ".env" });
}

// data source options 
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
          }
    ),
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    synchronize: false,
    entities: [User, Blog, Comment, Category, Role, Permission, RolePermission],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
