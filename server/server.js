const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session-middleware');

// Route includes
const userRouter = require('./routes/user.router');
const studentRouter = require('./routes/student.router');
const pathRouter = require('./routes/path.router');
const barriersRouter = require('./routes/barriers.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/student', studentRouter);
app.use('/path', pathRouter);
app.use('/barriers', barriersRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
