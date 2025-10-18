import * as vscode from 'vscode';
import { ConnectionManager } from '../connection/connectionManager';

const connectionManager = new ConnectionManager();

export function registerCommands(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('xrepl.connect', async () => {
      const connectionType = await vscode.window.showQuickPick(['TCP', 'UNIX Socket'], {
        placeHolder: 'Select connection type',
      });

      if (!connectionType) {
        return;
      }

      // Show connection UI and connect
      void vscode.window.showInformationMessage(
        `TODO: Implement ${connectionType} connection dialog`
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xrepl.disconnect', () => {
      connectionManager.disconnect();
      void vscode.window.showInformationMessage('Disconnected from xrepl');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xrepl.evalSelection', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.document.getText(editor.selection);
      void vscode.window.showInformationMessage(
        `TODO: Evaluate selection (${selection.length} chars)`
      );
    })
  );
}
