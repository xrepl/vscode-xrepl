import * as vscode from 'vscode';
import { XReplConfig } from '../types/config';

export function getConfig(): XReplConfig {
  const config = vscode.workspace.getConfiguration('xrepl');

  return {
    connectionType: config.get<'tcp' | 'unix'>('connection.type', 'tcp'),
    tcp: {
      host: config.get<string>('connection.tcp.host', 'localhost'),
      port: config.get<number>('connection.tcp.port', 7888),
    },
    unix: {
      socket: config.get<string>('connection.unix.socket', '/tmp/xrepl.sock'),
    },
    autoConnect: config.get<boolean>('autoConnect', false),
    traceLevel: config.get<'off' | 'messages' | 'verbose'>('trace.server', 'off'),
  };
}
