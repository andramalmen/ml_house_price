import config from 'config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { Server } from 'typescript-rest';
import errorHandler from './middleware/error';

class ApiServer {
    public PORT: number = config.get('port') || 8080;
    private readonly app: express.Application;
    private server: http.Server | undefined;

    constructor() {
        this.app = express();
        this.config();

        Server.loadServices(this.app, 'services/*', __dirname);
    }

    public async start() {
        return new Promise<any | void>((resolve, reject) => {
            //@ts-expect-error TODO
            this.server = this.app.listen(this.PORT, (err: unknown) => {
                if (err) {
                    return reject(err);
                }

                console.info(`Listening to http://127.0.0.1:${this.PORT}`);

                return resolve(null);
            });
        });
    }

    public async stop(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(morgan('combined'));
        this.app.use(errorHandler);
    }
}

export default ApiServer;
