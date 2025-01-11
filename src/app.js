import express from 'express';
import path from 'path';
import { title } from 'process';

const __dirname = path.resolve()
const app = express();
const port = 5001

app.use("/static",express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")
app.set("views",__dirname+"/src/views")

app.get('/', (req, res) =>{
    res.render("pages/index", {
        title: "Home"
    })
})

app.get('/components', (req, res) =>{
    res.render("pages/components", {
        title: "Components"
    })
})

app.get('/forms', (req, res) =>{
    res.render("pages/forms", {
        title: "Forms"
    })
})

app.get('/icons', (req, res) =>{
    res.render("pages/icons", {
        title: "Icons"
    })
})

app.get('/notifications', (req, res) =>{
    res.render("pages/notifications" , {
        title: "Notifications"
    })
})

app.get('/tables', (req, res) =>{
    res.render("pages/tables" , {
        title: "Tables"
    })
})

app.get('/typographys', (req, res) =>{
    res.render("pages/typographys", {
        title: "Typographys"
    })
})

app.listen(port, function () {
    console.log("http://localhost:" + port)
})