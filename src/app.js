const express = require('express');
const cors = require('cors');

const authRoutes = require('./v1/routes/authRoutes');

const dashRoutes = require('./v1/routes/dashRoutes');
const customerRoutes = require('./v1/routes/customerRoutes');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/dashboard', dashRoutes);
app.use('/api/v1/customers', customerRoutes);


app.listen(3003, () => {
    console.log('Server is running on port 3003');
})

