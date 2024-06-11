
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    token = token.split(" ")[1]

    try {

        const { email, role_id } = jwt.verify(token, process.env.JWT_SECRET)
        req.email = email
        req.role_id = role_id

        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Invalid token" });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.role_id === 1) {
        return next()
    }

    return res.status(403).json({ error: "Unauthorized only admin user" })
}

export const verifyVet = (req, res, next) => {
    if (req.role_id === 2 || req.role_id === 1) {
        return next()
    }
    return res.status(403).json({ error: "Unauthorized only vet user" })
}