const express = require('express');
const cors = require('cors');

const authRoutes = require('./v1/routes/authRoutes');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth', authRoutes);

app.listen(3003, () => {
    console.log('Server is running on port 3003');
})

