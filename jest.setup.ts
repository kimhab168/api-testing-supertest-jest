// jest.setup.ts
// import '@testing-library/jest-dom/extend-expect'; // Comment out or remove if not needed
import * as dotenv from "dotenv";

// Load environment variables from a `.env.test` file if it exists
dotenv.config({ path: ".env.test" });
