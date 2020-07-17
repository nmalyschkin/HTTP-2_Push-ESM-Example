const fs = require("fs");
const path = require("path");
const { resolveDependencies } = require("util");

const fastify = require("fastify")({
    http2: true,
    https: {
        key: fs.readFileSync(path.join(__dirname, "https", "example.key")),
        cert: fs.readFileSync(path.join(__dirname, "https", "example.crt")),
    },
});

const srcPath = path.join(__dirname, `./src`);

/**
 * Serve the HTML entry point
 */
fastify.get("/", async function (request, reply) {
    const readStream = fs.createReadStream("./index.html");

    reply.code(200).type("text/html").send(readStream);
});

/**
 * Serve the JavaScript Modules
 */
fastify.get("/:file", async function (request, reply) {
    const readStream = fs.createReadStream(path.join(srcPath, request.params.file));

    const deps = await resolveDependencies(path.join(srcPath, request.params.file));

    for (const dependecy of deps) {
        request.raw.stream.pushStream(
            { ":path": `/${path.relative(srcPath, dependecy)}` },
            (err, stream) => {
                if (err) throw err;

                stream.respondWithFile(dependecy, {
                    "cache-control": "public, max-age=31536000",
                    "content-type": "application/javascript",
                });
            }
        );
    }

    reply.code(200).type("application/javascript").send(readStream);
});

fastify.listen(3001).then(console.log);
