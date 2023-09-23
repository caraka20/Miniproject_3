const express = require("express")
const Router = express.Router()
const {kasirController} = require("../controller")
const upload = require('../middleware/upload')

Router.post("/", upload, kasirController.createKasir)
Router.put("/:id", kasirController.updateKasir)

module.exports = Router
