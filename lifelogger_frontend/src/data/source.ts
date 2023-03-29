import {DataSource} from "typeorm/browser";
import {Photo} from "./entities/Photo";


export const dataSource = new DataSource({
    database: "life",
    driver: require('expo-sqlite'),
    entities: [
        Photo
    ],
    synchronize: true,
    type: "expo",
});

dataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))