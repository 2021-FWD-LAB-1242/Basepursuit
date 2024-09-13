const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goals');
const projectRoutes = require('./routes/projects');
const companyRoutes = require('./routes/companies');
const resourceRoutes = require('./routes/resources');
const linkRoutes = require('./routes/links');
const interviewRoutes = require('./routes/interviews');

// Use Routes
app.use('/api/interviews', interviewRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/links', linkRoutes);

mongoose.connect('mongodb://localhost:27017/pursuit', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
