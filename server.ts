import express from "express";
import path from "path";
import { app, initializeDatabase } from "./server/index";
import { config } from "./server/config";

async function startServer() {
  const PORT = 3000;
  const HOST = "0.0.0.0";

  try {
    await initializeDatabase();
  } catch (error) {
    console.error("[db] initialization failed", error);
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`NexTake server running on http://${HOST}:${PORT}`);
  });
}

startServer();
