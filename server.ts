import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const db = new Database("database.sqlite");

// Initialize Database Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    "order" INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    "order" INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    quote TEXT NOT NULL,
    image TEXT NOT NULL,
    "order" INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Middleware
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || "deio-info-secret-123";
const ADMIN_EMAIL = "deiorbo@gmail.com";
// Em produção, você guardaria a senha criptografada. Aqui usaremos a que você forneceu.
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || "Deio@2409", 10);

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH API ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  
  if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token, user: { email: ADMIN_EMAIL } });
  }
  
  res.status(401).json({ message: "Credenciais inválidas" });
});

app.get("/api/me", authenticateToken, (req, res) => {
  res.json({ user: (req as any).user });
});

// --- SERVICES API ---
app.get("/api/services", (req, res) => {
  const services = db.prepare("SELECT * FROM services ORDER BY \"order\" ASC").all();
  res.json(services);
});

app.post("/api/services", authenticateToken, (req, res) => {
  const { id, title, description, icon, order } = req.body;
  const stmt = db.prepare("INSERT OR REPLACE INTO services (id, title, description, icon, \"order\") VALUES (?, ?, ?, ?, ?)");
  stmt.run(id, title, description, icon, order);
  res.json({ success: true });
});

app.delete("/api/services/:id", authenticateToken, (req, res) => {
  db.prepare("DELETE FROM services WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// --- FAQS API ---
app.get("/api/faqs", (req, res) => {
  const faqs = db.prepare("SELECT * FROM faqs ORDER BY \"order\" ASC").all();
  res.json(faqs);
});

app.post("/api/faqs", authenticateToken, (req, res) => {
  const { id, question, answer, order } = req.body;
  const stmt = db.prepare("INSERT OR REPLACE INTO faqs (id, question, answer, \"order\") VALUES (?, ?, ?, ?)");
  stmt.run(id, question, answer, order);
  res.json({ success: true });
});

app.delete("/api/faqs/:id", authenticateToken, (req, res) => {
  db.prepare("DELETE FROM faqs WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// --- TESTIMONIALS API ---
app.get("/api/testimonials", (req, res) => {
  const testimonials = db.prepare("SELECT * FROM testimonials ORDER BY \"order\" ASC").all();
  res.json(testimonials);
});

app.post("/api/testimonials", authenticateToken, (req, res) => {
  const { id, name, title, quote, image, order } = req.body;
  const stmt = db.prepare("INSERT OR REPLACE INTO testimonials (id, name, title, quote, image, \"order\") VALUES (?, ?, ?, ?, ?, ?)");
  stmt.run(id, name, title, quote, image, order);
  res.json({ success: true });
});

app.delete("/api/testimonials/:id", authenticateToken, (req, res) => {
  db.prepare("DELETE FROM testimonials WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// --- CONTENT API (About, Settings) ---
app.get("/api/content/:key", (req, res) => {
  const row = db.prepare("SELECT value FROM content WHERE key = ?").get(req.params.key) as any;
  if (row) {
    res.json(JSON.parse(row.value));
  } else {
    // Default values if empty
    if (req.params.key === 'about') res.json({ text: "" });
    else if (req.params.key === 'settings') res.json({ phone: "", email: "", location: "", whatsapp: "", facebook: "", instagram: "" });
    else res.status(404).json({ message: "Content not found" });
  }
});

app.post("/api/content/:key", authenticateToken, (req, res) => {
  const stmt = db.prepare("INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)");
  stmt.run(req.params.key, JSON.stringify(req.body));
  res.json({ success: true });
});

// Vite middleware development / Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
