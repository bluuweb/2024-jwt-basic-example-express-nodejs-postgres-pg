import { Router } from "express";
import path from "path";

const router = Router()

const __dirname = import.meta.dirname
const publicPath = path.join(__dirname, '../public')

router.get('/login', (req, res) => {
    res.sendFile(publicPath + "/login.html")
})

router.get('/profile', (req, res) => {
    res.sendFile(publicPath + "/profile.html")
})

router.get('/admin', (req, res) => {
    res.sendFile(publicPath + "/admin.html")
})

router.get('/pets', (req, res) => {
    res.sendFile(publicPath + "/pets.html")
})

export default router