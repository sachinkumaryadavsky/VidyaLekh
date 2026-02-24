import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({ logger: true });

app.register(cors);
app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
});

app.get("/health", async () => {
  return { status: "VidyaLekh API running" };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running on port 3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();