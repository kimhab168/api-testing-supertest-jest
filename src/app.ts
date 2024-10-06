import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import fs from "fs";
import path from "path";
import { RegisterRoutes } from "./routes/v1/routes";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Global Middleware
// ========================
app.use(express.json()); // Help to get the json from request body
//User log
app.use((req: Request, _res: Response, next: NextFunction) => {
  const requestTime = new Date().toISOString();
  console.log(`[${requestTime}] ${req.method} ${req.url}`);
  next(); //function used in middleware to pass control to the next middleware function in the stack
});

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
// Handle Later

export default app;
