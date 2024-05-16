import fastify from "fastify";
import crypto from "node:crypto";
import { knex } from "./database";

const app = fastify();

app.get("/hello", async () => {
  return "Hello World!";
});

app.get("/schema", async () => {
  const schema = await knex("sqlite_schema").select("*");
  return schema;
});

app.get("/transactions", async () => {
  const transaction = await knex("transactions").select("*");
  return transaction;
});

app.post("/transactions", async () => {
  const transaction = await knex("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "Transação de teste",
      amount: 1000,
    })
    .returning("*");

  return transaction;
});

app.listen({ port: 3333 }).then(() => console.log("HTTP Server Running!"));
