const express = require('express');
const app = express()
const cors = require('cors')
const signUpRoute = require('./Routes/signup.route')
const loginRoute = require('./Routes/login.route')
const userRoute = require('./Routes/users.route')
const lobbyRoute = require('./Routes/lobbies.route')


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/login', loginRoute)
app.use('/signup', signUpRoute)
app.use('/users', userRoute)
app.use('/lobbies', lobbyRoute)

