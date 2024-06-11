import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import { UserModel } from '../models/user.model.js'


// /api/v1/users/register
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password, username" })
        }

        const user = await UserModel.findOneByEmail(email)
        if (user) {
            return res.status(409).json({ ok: false, msg: "Email already exists" })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await UserModel.create({ email, password: hashedPassword, username })

        const token = jwt.sign({ email: newUser.email, role_id: newUser.role_id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(201).json({
            ok: true,
            msg: {
                token, role_id: newUser.role_id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// /api/v1/users/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Missing required fields: email, password" });
        }

        const user = await UserModel.findOneByEmail(email)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email, role_id: user.role_id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.json({
            ok: true, msg: {
                token, role_id: user.role_id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const profile = async (req, res) => {
    try {

        const user = await UserModel.findOneByEmail(req.email)
        return res.json({ ok: true, msg: user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await UserModel.findAll()

        return res.json({ ok: true, msg: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const updateRoleVet = async (req, res) => {
    try {
        const { uid } = req.params

        const user = await UserModel.findOneByUid(uid)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = await UserModel.updateRoleVet(uid)

        return res.json({
            ok: true,
            msg: updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const UserController = {
    register,
    login,
    profile,
    findAll,
    updateRoleVet
}