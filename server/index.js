const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
PORT = 3001


app.listen(PORT, () => {
    console.log("Sedang Berjalan " + PORT);
})

