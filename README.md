<<<<<<< HEAD
# @xrepl/vscode
=======
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
>>>>>>> 2e0f775 (Initial project setup for @xrepl/vscode extension)
