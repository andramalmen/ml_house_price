import { CreateTableCommand, waitUntilTableExists } from '@aws-sdk/client-dynamodb';
import config from 'config';
import logger from '../utils/logger';
import { dynamoDBClient } from './dynamoClient';

class DynamoOperations {
    private dbClient = dynamoDBClient;
    private tableName: string = config.get('tableName') || 'house_data';

    public async checkTableExists() {
        try {
            await waitUntilTableExists(
                { client: this.dbClient, minDelay: 2, maxWaitTime: 4 },
                { TableName: this.tableName }
            );

            logger.info(`Table '${this.tableName}' already exists. No action is taken.`);
        } catch (err) {
            logger.error(err);
            this.createTable();
        }
    }

    private async createTable() {
        const tableParams = {
            AttributeDefinitions: [
                {
                    AttributeName: 'Id',
                    AttributeType: 'S',
                },
            ],
            KeySchema: [
                {
                    AttributeName: 'Id',
                    KeyType: 'HASH',
                },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
            TableName: this.tableName,
            StreamSpecification: {
                StreamEnabled: false,
            },
        };

        try {
            const data = await this.dbClient.send(new CreateTableCommand(tableParams));
            logger.info(`Table '${data.TableDescription?.TableName}' was successfuly created.`);
        } catch (err) {
            logger.info(`Table '${this.tableName}' could not be created.`);
            logger.fatal(err);
        }
    }
}

export default DynamoOperations;
