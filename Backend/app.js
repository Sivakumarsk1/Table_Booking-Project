const express = require('express');
const cors = require('cors');

const UR = require('./routes/userRoutes');
const adm = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
app.options('*', cors());
app.use(express.json());

app.use('/admin', adm);
app.use('/user', UR);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
