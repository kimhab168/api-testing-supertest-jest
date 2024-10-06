import app from "./app";
import configs from "@/config";
import { connectToDB } from "./database/connection";

async function runServer() {
  try {
    await connectToDB();
    app.listen(configs.port, () => {
      console.log(`User Service running on Port: ${configs.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

runServer();
