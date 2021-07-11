import DynamoOperations from './utils/dynamo';

const checkTable = async () => {
    const dynamo = new DynamoOperations();
    await dynamo.checkTableExists();
};

checkTable();
