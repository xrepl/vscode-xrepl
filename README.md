# xrepl for Visual Studio Code

[![Build Status][gh-actions-badge]][gh-actions]
[![Tags][github-tags-badge]][github-tags]

[![Project Logo][logo]][logo-large]

*VSCode extension for integrating with xrepl (network-based REPL)*

## Features

- Connect to xrepl via TCP or UNIX domain sockets
- Evaluate code selections in active REPL session
- Manage multiple REPL sessions
- Session tree view in Explorer

## Requirements

- Running xrepl server (TCP or UNIX socket)

## Extension Settings

This extension contributes the following settings:

- `xrepl.connection.type`: Default connection type (tcp/unix)
- `xrepl.connection.tcp.host`: TCP host
- `xrepl.connection.tcp.port`: TCP port
- `xrepl.connection.unix.socket`: UNIX socket path
- `xrepl.autoConnect`: Auto-connect on startup

## Development

```bash
npm install
npm run watch
# Press F5 to launch Extension Development Host
```

[//]: ---Named-Links---

[logo]: https://raw.githubusercontent.com/xrepl/xrepl/refs/heads/main/priv/images/logo-v1-x250.png
[logo-large]: https://raw.githubusercontent.com/xrepl/xrepl/refs/heads/main/priv/images/logo-v1-x4800.png
[gh-actions-badge]: https://github.com/xrepl/vscode-xrepl/actions/workflows/cicd.yml/badge.svg
[gh-actions]: https://github.com/ORG/xrepl/vscode-xrepl/actions/workflows/cicd.yml
[github-tags]: https://github.com/ORG/xrepl/tags
[github-tags-badge]: https://img.shields.io/github/tag/lfe/xrepl.svg
