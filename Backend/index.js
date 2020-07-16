const cors = require("cors")
const express = require("express")
const app = express()
const Routes = require("./routes")

app.use(cors());
app.use(express.json())
app.use(Routes)


app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({error:error.message})
})

app.listen(3333)