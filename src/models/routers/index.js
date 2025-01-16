import categryRouter from "./categoryRouters.js";

export default function router(app){
    app.use("/categories", categryRouter)
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
}