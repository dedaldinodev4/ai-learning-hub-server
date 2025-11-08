import { server } from "./server";
import { config } from "./config";

try {
  server.listen({ port: config.PORT || 3333 }).then(() => {
    console.log(`Server running on port ${config.PORT}`)
  })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
