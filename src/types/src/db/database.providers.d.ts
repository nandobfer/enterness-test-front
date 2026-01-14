import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
declare const dataSource: DataSource;
export declare const databaseProviders: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<DataSource>;
}[];
export default dataSource;
