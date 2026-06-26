const API="https://citibim-6vzx.onrender.com/api";
async function updateDashboard(){
try{
const r=await fetch(API); const d=await r.json();
status.textContent="ONLINE";
temp.textContent=d.dht_temperature+" °C";
hum.textContent=d.dht_humidity+" %";
bme_temp.textContent=d.bme_temperature+" °C";
bme_hum.textContent=d.bme_humidity+" %";
pressure.textContent=d.pressure+" Pa";
lux.textContent=d.lux+" Lux";
gsm.textContent=d.gsm_signal;
sat.textContent=d.satellites;
lat.textContent=d.latitude;
lon.textContent=d.longitude;
mapLink.href=`https://www.google.com/maps?q=${d.latitude},${d.longitude}`;
time.textContent=new Date(d.updated).toLocaleString();
}catch(e){status.textContent="OFFLINE";console.log(e);}
}
updateDashboard();setInterval(updateDashboard,5000);