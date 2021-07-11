import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import config from 'config';

const getClientOptions = (): DynamoDBClientConfig => {
    const region = 'eu-west-1';
    const endpoint: string = config.get('dynamoEndpoint') || 'http://localhost:8000';

    if (process.env.NODE_ENV === 'test') {
        return {
            region: 'local',
        };
    } else if (process.env.NODE_ENV === 'development') {
        return { apiVersion: 'latest', endpoint };
    } else {
        return {
            apiVersion: 'latest',
            region,
        };
    }
};

export const dynamoDBClient = new DynamoDBClient(getClientOptions());
