# server side dependency resolvement and deployment with ES Modules and HTTP/2 Push

This is a proof of concept implementation. It showcases how JavaScript applications can be deployed without bundling or the penalty of multiple roundtrips to loaded all dependencies.

## How to run

To run the servers you need a custom version of node. You can either use the node binary in this repository (built for Linux x64) or compile it yourself from: https://github.com/nmalyschkin/node/tree/resolveDependencies

### Server 1

Reference server, ESM applications with sequentially loaded dependencies.

### Server 2

**Attention: Needs special version of nodeJS!!!**
POC implementation, resolves module dependencies on request and pushes all declarative imports.

-   uses fastify because of the HTTP/2 support
-   supports circular dependencies and imperative imports
-   can not resolve imports from node_modules (can be fixed by importing from a node_module by path)
-   dont forget to use https when accessing the website

---

Feel free to checkout the code and play around with it. Make sure your browser supports [Javascript modules](https://caniuse.com/#feat=es6-module).

If you have any questions, feel free to open issues.
