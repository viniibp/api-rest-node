import fastify from "fastify";
import { knex } from "./database";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify();

app.register(transactionsRoutes, {
  prefix: "transactions",
});

app.get("/hello", async () => {
  return "Hello World!";
});

app.get("/schema", async () => {
  const schema = await knex("sqlite_schema").select("*");
  return schema;
});

app.listen({ port: env.PORT }).then(() => console.log("HTTP Server Running!"));
