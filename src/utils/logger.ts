import * as vscode from 'vscode';

export class Logger {
  private outputChannel: vscode.OutputChannel;
  private context: string;

  constructor(context: string) {
    this.context = context;
    this.outputChannel = vscode.window.createOutputChannel('xrepl');
  }

  private log(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[${timestamp}] [${level}] [${this.context}] ${message}`);
  }

  info(message: string): void {
    this.log('INFO', message);
  }

  warn(message: string): void {
    this.log('WARN', message);
  }

  error(message: string): void {
    this.log('ERROR', message);
  }

  show(): void {
    this.outputChannel.show();
  }
}
