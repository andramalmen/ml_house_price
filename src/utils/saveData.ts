import config from 'config';
import data from '../../data/final.json';
import { marshall } from '@aws-sdk/util-dynamodb';
import { dynamoDBClient } from './dynamoClient';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import logger from './logger';

const tableName: string = config.get('tableName') || 'house_data';

const saveData = async () => {
    // @ts-ignore
    for (const item of data) {
        const { id, ...itemBody } = item;
        const Id: string | undefined = id?.toString() ?? itemBody.friendlyId;
        if (!Id) {
            logger.error(`Id is missing for item ${JSON.stringify(item)}`);
        }
        const houseItem = { itemBody, Id };

        try {
            const params = {
                TableName: tableName,
                Item: marshall(houseItem, { removeUndefinedValues: true }),
            };
            await dynamoDBClient.send(new PutItemCommand(params));
        } catch (error) {
            logger.error(
                `An error has occured when trying to put item ${JSON.stringify(houseItem)}`
            );
            logger.fatal(error);
            logger.info('............\n');
        }
    }
};

export default saveData;
