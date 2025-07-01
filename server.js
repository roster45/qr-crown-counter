const express = require('express');
const fs = require('fs-extra');
const app = express();
const PORT = process.env.PORT || 3000;
const counterFile = 'counter.json';

app.use(express.static('public'));

app.get('/scan', async (req, res) => {
  let data = await fs.readJson(counterFile).catch(() => ({ count: 0 }));
  data.count += 1;
  await fs.writeJson(counterFile, data);
  res.redirect('/');
});

app.get('/total-scan', async (req, res) => {
  let data = await fs.readJson(counterFile).catch(() => ({ count: 0 }));
  res.send(`Hai Crown, QR ini sudah discan sebanyak ${data.count} kali.`);
});

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));