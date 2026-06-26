const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

/* ==========================
   BLYNK CONFIG
========================== */

const TOKEN = "wx_KExNySnAW7-jl83nWtp-WM-2Anfq6";
const BASE = `https://blynk.cloud/external/api/get?token=${TOKEN}&`;

/* ==========================
   SAFE FETCH
========================== */

async function get(pin) {
    try {
        const res = await fetch(BASE + pin);
        return await res.text();
    } catch (err) {
        return "0";
    }
}

/* ==========================
   HOME
========================== */

app.get("/", (req, res) => {

    res.json({
        project: "CITIBIM Environmental Monitoring",
        version: "2.0",
        status: "ONLINE",
        author: "ESS",
        api: "/api",
        health: "/health"
    });

});

/* ==========================
   HEALTH CHECK
========================== */

app.get("/health", (req,res)=>{

    res.json({

        status:"ONLINE",

        uptime:process.uptime(),

        timestamp:new Date()

    });

});

/* ==========================
   ABOUT
========================== */

app.get("/about",(req,res)=>{

res.json({

project:"CITIBIM",

description:"Cloud Based Environmental Monitoring System",

developer:"Akinola Shafiu",

backend:"Node.js",

cloud:"Render",

dashboard:"GitHub Pages"

});

});

/* ==========================
   VERSION
========================== */

app.get("/version",(req,res)=>{

res.json({

version:"2.0.0",

release:"June 2026"

});

});

/* ==========================
   MAIN API
========================== */

app.get("/api", async (req,res)=>{

const data={

latitude:await get("V0"),

longitude:await get("V1"),

dht_temperature:await get("V2"),

dht_humidity:await get("V3"),

lux:await get("V4"),

gsm_signal:await get("V5"),

satellites:await get("V6"),

bme_temperature:await get("V7"),

bme_humidity:await get("V8"),

pressure:await get("V9"),

updated:new Date()

};

res.json(data);

});

/* ==========================
   PORT
========================== */

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{

console.log("=================================");
console.log("CITIBIM Backend Started");
console.log("Port :",PORT);
console.log("=================================");

});