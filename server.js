const express = require('express')
require('dotenv').config()
const cors = require('cors')
const restaurantRouter = require('./Routes/restaurants')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/restaurants', restaurantRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))