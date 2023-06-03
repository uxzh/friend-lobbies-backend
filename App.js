const express = require('express');
const app = express()
const cors = require('cors')
const PORT = 4000

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})