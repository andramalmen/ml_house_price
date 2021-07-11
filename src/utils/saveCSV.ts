import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import config from 'config';
import { createObjectCsvWriter } from 'csv-writer';
import { dynamoDBClient } from './dynamoClient';
import logger from './logger';

const tableName: string = config.get('tableName') || 'house_data';

interface IHouse {
    houseId: string;
    price: number;
    subType: string;
    new: boolean;
    type: string;
    year: number;
    rooms: number;
    area: number;
}

const saveCSV = async () => {
    const params = {
        TableName: tableName,
    };

    try {
        const { Items } = await dynamoDBClient.send(new ScanCommand(params));
        if (!Items) {
            return;
        }

        const houses = Items?.map(item => {
            const house = unmarshall(item);
            const roomStructure = house.itemBody?.roomStructure?.split('+');
            if (!roomStructure) {
                return;
            }
            const numRooms = parseInt(roomStructure[0].trim(), 10);
            if (!numRooms) {
                return;
            }
            if (!house.itemBody.friendlyId) {
                console.log(house.itemBody);
            }
            return {
                houseId: house.itemBody.friendlyId,
                price: house.itemBody.searchPrice,
                subType: house.itemBody.propertySubtype,
                new: house.itemBody.newBuilding,
                type: house.itemBody.propertyType,
                year: house.itemBody.constructionFinishedYear,
                rooms: numRooms,
                area: house.itemBody.area,
            };
        }).filter(item => item);

        await createCSV(houses);
    } catch (error) {
        logger.error(error);
    }
};

export const createCSV = async (data: (IHouse | undefined)[]) => {
    try {
        const csvWriter = await createObjectCsvWriter({
            path: './csv/house.csv',
            header: [
                { id: 'houseId', title: 'Id' },
                { id: 'price', title: 'Price' },
                { id: 'type', title: 'Type' },
                { id: 'subType', title: 'SubType' },
                { id: 'new', title: 'New' },
                { id: 'year', title: 'Year' },
                { id: 'rooms', title: 'Rooms' },
                { id: 'area', title: 'Area' },
            ],
        });
        if (data) {
            console.log(data.length);
            // @ts-ignore
            await csvWriter.writeRecords(data);
            logger.info('CSV Created');
        }
    } catch (error) {
        logger.error(error);
    }
};

export default saveCSV;
