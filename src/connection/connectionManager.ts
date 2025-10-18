import * as net from 'net';
import { ConnectionInfo } from '../types/config';
import { Logger } from '../utils/logger';

export class ConnectionManager {
  private socket: net.Socket | null = null;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ConnectionManager');
  }

  async connect(info: ConnectionInfo): Promise<void> {
    this.logger.info(`Connecting to xrepl (${info.type})...`);

    return new Promise((resolve, reject) => {
      this.socket = new net.Socket();

      this.socket.on('connect', () => {
        this.logger.info('Connected to xrepl');
        resolve();
      });

      this.socket.on('error', (err) => {
        this.logger.error(`Connection error: ${err.message}`);
        reject(err);
      });

      this.socket.on('close', () => {
        this.logger.info('Connection closed');
        this.socket = null;
      });

      // Connect based on type
      if (info.type === 'tcp') {
        this.socket.connect(info.port!, info.host!);
      } else {
        this.socket.connect(info.socket!);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
      this.logger.info('Disconnected from xrepl');
    }
  }

  isConnected(): boolean {
    return this.socket !== null && !this.socket.destroyed;
  }

  // Placeholder for sending data
  // TODO: Integrate with xrepl.ts client library
  send(): void {
    if (!this.socket) {
      throw new Error('Not connected to xrepl');
    }
    // Implementation will use xrepl.ts client
    this.logger.warn('send() not yet implemented - waiting for xrepl.ts');
  }
}
