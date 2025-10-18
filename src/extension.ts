import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerViews } from './views';
import { Logger } from './utils/logger';

let logger: Logger;

export function activate(context: vscode.ExtensionContext) {
  logger = new Logger('xrepl');
  logger.info('xrepl extension activating...');

  // Register commands
  registerCommands(context);

  // Register views
  registerViews();

  logger.info('xrepl extension activated');
}

export function deactivate() {
  logger?.info('xrepl extension deactivating...');
  // Cleanup connections, etc.
}
