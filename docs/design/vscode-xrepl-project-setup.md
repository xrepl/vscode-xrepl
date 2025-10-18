# VSCode xrepl Extension - Project Setup Instructions

## Project Overview

Create a TypeScript-based VSCode extension for integrating with xrepl (a network-based LFE REPL using MessagePack over TCP/UNIX sockets).

**Project Details:**

- **Local path**: `~/lab/lfe/xrepl/vscode-xrepl`
- **Repository**: <https://github.com/xrepl/vscode-xrepl>
- **Extension ID**: `vscode-xrepl`
- **Display Name**: `xrepl`
- **Description**: xrepl integration for Visual Studio Code

**Key Requirements:**

- TypeScript-based VSCode extension following VSCode and TypeScript community best practices
- Support connecting to xrepl via TCP and UNIX domain sockets
- Placeholder for future `xrepl.ts` dependency (protocol implementation will be added later)
- Project structure should allow easy integration of the xrepl.ts client library once available

## Step 1: Initialize Extension Project

```bash
# Navigate to project directory
cd ~/lab/lfe/xrepl/vscode-xrepl

# Initialize with Yeoman generator (recommended by VSCode team)
npm install -g yo generator-code
yo code

# When prompted, select:
# - "New Extension (TypeScript)"
# - Extension name: "vscode-xrepl"
# - Identifier: "vscode-xrepl"
# - Description: "xrepl (LFE) integration for Visual Studio Code"
# - Initialize git repository: Yes
# - Package manager: npm (or pnpm if preferred)
# - Bundle with webpack: Yes (for smaller package size)
```

## Step 2: Configure TypeScript

Update `tsconfig.json` to follow best practices:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "target": "ES2022",
    "lib": ["ES2022"],
    "sourceMap": true,
    "rootDir": "src",
    "outDir": "out",
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "Node16"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", ".vscode-test"]
}
```

## Step 3: Project Structure

Create the following directory structure:

```
./
├── .vscode/
│   ├── launch.json          # Debug configuration
│   ├── tasks.json           # Build tasks
│   └── extensions.json      # Recommended extensions
├── src/
│   ├── extension.ts         # Extension entry point
│   ├── commands/            # Command implementations
│   │   ├── index.ts
│   │   ├── connect.ts
│   │   ├── disconnect.ts
│   │   ├── evalSelection.ts
│   │   └── sessionManager.ts
│   ├── views/               # Tree views and webviews
│   │   ├── index.ts
│   │   ├── sessionTreeView.ts
│   │   └── replPanel.ts
│   ├── providers/           # VSCode providers
│   │   ├── index.ts
│   │   └── statusBarProvider.ts
│   ├── connection/          # Connection management (TCP/UNIX)
│   │   ├── index.ts
│   │   ├── connectionManager.ts
│   │   ├── tcpConnection.ts
│   │   └── unixConnection.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts
│   │   └── config.ts
│   └── utils/               # Utility functions
│       ├── index.ts
│       ├── logger.ts
│       └── config.ts
├── resources/               # Icons, images, etc.
├── test/                    # Tests
│   └── suite/
│       └── extension.test.ts
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## Step 4: Configure package.json

Update `package.json` with proper metadata and extension configuration:

```json
{
  "name": "vscode-xrepl",
  "displayName": "xrepl",
  "description": "xrepl integration for Visual Studio Code",
  "version": "0.0.1",
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/xrepl/vscode-xrepl"
  },
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": [
    "Programming Languages",
    "Other"
  ],
  "activationEvents": [
    "onCommand:xrepl.connect",
    "onView:xreplSessions"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "xrepl.connect",
        "title": "Connect to xrepl Server",
        "category": "xrepl"
      },
      {
        "command": "xrepl.connectTCP",
        "title": "Connect to xrepl (TCP)",
        "category": "xrepl"
      },
      {
        "command": "xrepl.connectUnix",
        "title": "Connect to xrepl (UNIX Socket)",
        "category": "xrepl"
      },
      {
        "command": "xrepl.disconnect",
        "title": "Disconnect from xrepl",
        "category": "xrepl"
      },
      {
        "command": "xrepl.evalSelection",
        "title": "Evaluate Selection in xrepl",
        "category": "xrepl"
      },
      {
        "command": "xrepl.evalFile",
        "title": "Evaluate Entire File in xrepl",
        "category": "xrepl"
      },
      {
        "command": "xrepl.showSessions",
        "title": "Show xrepl Sessions",
        "category": "xrepl"
      }
    ],
    "views": {
      "explorer": [
        {
          "id": "xreplSessions",
          "name": "xrepl Sessions"
        }
      ]
    },
    "viewsWelcome": [
      {
        "view": "xreplSessions",
        "contents": "No xrepl connection active.\n[Connect to xrepl](command:xrepl.connect)"
      }
    ],
    "configuration": {
      "title": "xrepl",
      "properties": {
        "xrepl.connection.type": {
          "type": "string",
          "enum": ["tcp", "unix"],
          "default": "tcp",
          "description": "Default connection type for xrepl"
        },
        "xrepl.connection.tcp.host": {
          "type": "string",
          "default": "localhost",
          "description": "TCP host for xrepl connection"
        },
        "xrepl.connection.tcp.port": {
          "type": "number",
          "default": 7888,
          "description": "TCP port for xrepl connection"
        },
        "xrepl.connection.unix.socket": {
          "type": "string",
          "default": "/tmp/xrepl.sock",
          "description": "UNIX domain socket path for xrepl connection"
        },
        "xrepl.autoConnect": {
          "type": "boolean",
          "default": false,
          "description": "Automatically connect to xrepl on startup"
        },
        "xrepl.trace.server": {
          "type": "string",
          "enum": ["off", "messages", "verbose"],
          "default": "off",
          "description": "Trace communication with xrepl server"
        }
      }
    },
    "keybindings": [
      {
        "command": "xrepl.evalSelection",
        "key": "ctrl+enter",
        "mac": "cmd+enter",
        "when": "editorTextFocus"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "webpack",
    "watch": "webpack --watch",
    "package": "webpack --mode production --devtool hidden-source-map",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "npm run compile-tests && npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "lint:fix": "eslint src --ext ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "format:check": "prettier --check \"src/**/*.ts\"",
    "test": "node ./out/test/runTest.js"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0",
    "@types/node": "^20.x",
    "@types/mocha": "^10.0.6",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "@vscode/test-electron": "^2.3.8",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "typescript": "^5.3.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "ts-loader": "^9.5.1"
  },
  "dependencies": {
    "@msgpack/msgpack": "^3.0.0"
  }
}
```

## Step 5: Configure ESLint

Create `.eslintrc.json`:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/semi": "warn",
    "curly": "warn",
    "eqeqeq": "warn",
    "no-throw-literal": "warn",
    "semi": "off"
  },
  "ignorePatterns": ["out", "dist", "**/*.d.ts"]
}
```

## Step 6: Configure Prettier

Create `.prettierrc.json`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## Step 7: Create Core Source Files

### src/extension.ts (Entry Point)

```typescript
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
  registerViews(context);

  logger.info('xrepl extension activated');
}

export function deactivate() {
  logger?.info('xrepl extension deactivating...');
  // Cleanup connections, etc.
}
```

### src/types/config.ts

```typescript
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
```

### src/connection/connectionManager.ts (Stub)

```typescript
import * as net from 'net';
import { ConnectionInfo } from '../types/config';
import { Logger } from '../utils/logger';

export class ConnectionManager {
  private socket: net.Socket | null = null;
  private logger: Logger;
  private connectionInfo: ConnectionInfo | null = null;

  constructor() {
    this.logger = new Logger('ConnectionManager');
  }

  async connect(info: ConnectionInfo): Promise<void> {
    this.logger.info(`Connecting to xrepl (${info.type})...`);
    this.connectionInfo = info;

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
      this.connectionInfo = null;
      this.logger.info('Disconnected from xrepl');
    }
  }

  isConnected(): boolean {
    return this.socket !== null && !this.socket.destroyed;
  }

  // Placeholder for sending data
  // TODO: Integrate with xrepl.ts client library
  async send(data: unknown): Promise<void> {
    if (!this.socket) {
      throw new Error('Not connected to xrepl');
    }
    // Implementation will use xrepl.ts client
    this.logger.warn('send() not yet implemented - waiting for xrepl.ts');
  }
}
```

### src/utils/logger.ts

```typescript
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
```

### src/commands/index.ts (Stub)

```typescript
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
      vscode.window.showInformationMessage(
        `TODO: Implement ${connectionType} connection dialog`
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xrepl.disconnect', () => {
      connectionManager.disconnect();
      vscode.window.showInformationMessage('Disconnected from xrepl');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('xrepl.evalSelection', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.document.getText(editor.selection);
      vscode.window.showInformationMessage(
        `TODO: Evaluate selection (${selection.length} chars)`
      );
    })
  );
}
```

### src/views/index.ts (Stub)

```typescript
import * as vscode from 'vscode';

export function registerViews(context: vscode.ExtensionContext): void {
  // TODO: Register tree view for sessions
  // TODO: Register webview for REPL panel
  vscode.window.showInformationMessage('Views registration - TODO');
}
```

## Step 8: Configure Webpack

Update `webpack.config.js` for optimal bundling:

```javascript
//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
module.exports = config;
```

## Step 9: Create README.md

```markdown
# xrepl for Visual Studio Code

VSCode extension for integrating with xrepl (network-based REPL).

## Features

- Connect to xrepl via TCP or UNIX domain sockets
- Evaluate code selections in active REPL session
- Manage multiple REPL sessions
- Session tree view in Explorer

## Requirements

- Running xrepl server (TCP or UNIX socket)

## Extension Settings

This extension contributes the following settings:

* `xrepl.connection.type`: Default connection type (tcp/unix)
* `xrepl.connection.tcp.host`: TCP host
* `xrepl.connection.tcp.port`: TCP port
* `xrepl.connection.unix.socket`: UNIX socket path
* `xrepl.autoConnect`: Auto-connect on startup

## Development

```bash
npm install
npm run watch
# Press F5 to launch Extension Development Host
```

## Release Notes

### 0.0.1

Initial development release

```

## Step 10: Initialize Git

```bash
git init
git remote add origin https://github.com/xrepl/vscode-xrepl.git
git add .
git commit -m "Initial project setup for vscode-xrepl extension"
```

## Step 11: Development Workflow

```bash
# Install dependencies
npm install

# Start watch mode for development
npm run watch

# In VSCode, press F5 to launch Extension Development Host

# Run linter
npm run lint

# Format code
npm run format

# Run tests (once implemented)
npm run test
```

## Step 12: Future Integration Points

When the `xrepl.ts` library becomes available:

1. Add dependency to `package.json`:

   ```json
   "dependencies": {
     "@xrepl/client": "^1.0.0",
     "@msgpack/msgpack": "^3.0.0"
   }
   ```

2. Update `ConnectionManager` to use the xrepl.ts client:

   ```typescript
   import { XReplClient } from '@xrepl/client';

   export class ConnectionManager {
     private client: XReplClient;
     // ... implementation
   }
   ```

3. Implement protocol operations in commands:
   - `evalSelection` → `client.eval()`
   - `listSessions` → `client.lsSessions()`
   - etc.

## Notes

- The project is structured to easily integrate the `xrepl.ts` client library when ready
- Connection management is stubbed out with basic TCP/UNIX socket support
- Follow VSCode extension best practices throughout
- Use TypeScript strict mode for type safety
- All placeholder code is marked with TODO comments
- Extension can be tested locally via F5 (Extension Development Host)

## Next Steps

1. Complete connection management implementation
2. Implement session tree view
3. Create REPL webview panel
4. Add configuration UI for connection settings
5. Integrate xrepl.ts client library when available
6. Implement all protocol operations
7. Add comprehensive tests
8. Prepare for marketplace publication

```
