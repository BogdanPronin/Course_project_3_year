const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', formRoutes);
app.use('/api/orders', orderRoutes);

// Serve static files from the React app
app.use(express.static(path.join("src", 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join("src", 'client/build', 'index.html'));
});

sequelize.sync().then(() => {
    https.createServer({
        key: fs.readFileSync('../../localhost-key.pem'),
        cert: fs.readFileSync('../../localhost.pem')
    }, app).listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => console.log(err));
