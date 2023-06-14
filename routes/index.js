const express = require("express")
const routesComments = require("./routesComments")
const routesMovies = require("./routesMovies")
const routesSessions = require("./routesSessions")
const routesTheaters = require("./routesTheaters")
const routesUsers = require("./routesUsers")
const routesEmpleados = require("./routesEmpleados")
const routesClientes = require("./routesClientes")

function routerApi(app) {
    app.use('/movies', routesMovies)
    app.use('/comments', routesComments)    
    app.use('/sessions', routesSessions)
    app.use('/theaters', routesTheaters)
    app.use('/users', routesUsers)
    app.use('/empleados', routesEmpleados)
    app.use('/clientes', routesClientes)
}

module.exports = routerApi;