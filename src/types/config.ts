export interface XReplConfig {
  connectionType: 'tcp' | 'unix';
  tcp: {
    host: string;
    port: number;
  };
  unix: {
    socket: string;
  };
  autoConnect: boolean;
  traceLevel: 'off' | 'messages' | 'verbose';
}

export interface ConnectionInfo {
  type: 'tcp' | 'unix';
  host?: string;
  port?: number;
  socket?: string;
  token?: string;
}
