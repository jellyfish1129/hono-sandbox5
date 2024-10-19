import { Hono } from "hono";
import {todos} from "./todos/api";
import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";

const app = new Hono();
app.use("*", logger());
app.use("*", cors());
app.use("*", requestId());
app.use("*", (c, next) => {
	console.log(`Request ID: ${c.get("requestId")}`);
	return next();
  });
app.use("/api/*",
	basicAuth({
		username: "testuser",
		password: "testpassword",
	})
)
app.route("/api/todos", todos);

export default app;