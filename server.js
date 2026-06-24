const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

// =====================
// BLYNK CONFIG
// =====================
const TOKEN = "wx_KExNySnAW7-jl83nWtp-WM-2Anfq6";
const BASE = "https://blynk.cloud/external/api/get?token=";

// =====================
// HOME ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("CITIBIM Backend Running ✔");
});

// =====================
// SAFE FETCH FUNCTION
// =====================
async function get(pin) {
  try {
    const res = await fetch(`${BASE}${TOKEN}&${pin}`);
    return await res.text();
  } catch (err) {
    return "0";
  }
}

// =====================
// API ENDPOINTS
// =====================

// GPS
app.get("/lat", async (req,res)=> res.send(await get("V0")));
app.get("/lon", async (req,res)=> res.send(await get("V1")));

// DHT
app.get("/dht_temp", async (req,res)=> res.send(await get("V2")));
app.get("/dht_hum", async (req,res)=> res.send(await get("V3")));

// LUX / GSM / SAT
app.get("/lux", async (req,res)=> res.send(await get("V4")));
app.get("/gsm", async (req,res)=> res.send(await get("V5")));
app.get("/sat", async (req,res)=> res.send(await get("V6")));

// BME280
app.get("/bme_temp", async (req,res)=> res.send(await get("V7")));
app.get("/bme_hum", async (req,res)=> res.send(await get("V8")));

// PRESSURE (converted to bar)
app.get("/pressure", async (req,res)=> {
  const p = await get("V9");
  const bar = parseFloat(p) / 1000;
  res.send(bar.toFixed(2));
});

// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("CITIBIM running on port " + PORT);
});