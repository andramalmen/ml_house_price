import ApiServer from './api-server';

const start = async (): Promise<void> => {
    const apiServer = new ApiServer();
    await apiServer.start();
    const graceful = async () => {
        await apiServer.stop();
        process.exit(0);
    };

    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
};

export default start;
