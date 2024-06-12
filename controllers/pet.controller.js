import { PetModel } from "../models/pet.model.js"

const findAll = async (req, res) => {
    try {
        let { limit = 5, page = 1 } = req.query
        limit = +limit
        page = +page

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({ error: "Invalid queries" });
        }

        const count = await PetModel.count()
        const pets = await PetModel.findAll({ limit, page })

        const baseUrl = `${req.protocol}://${req.get('host')}/api/v1/pets`
        const baseUrlWithQueries = `${baseUrl}?limit=${limit}`

        const totalPages = Math.ceil(count / limit)
        const nextPage = page + 1 > totalPages ? null : `${baseUrlWithQueries}&page=${page + 1}`
        const prevPage = page - 1 < 1 ? null : `${baseUrlWithQueries}&page=${page - 1}`

        return res.json({
            pagination: {
                count,
                totalPages,
                nextPage,
                prevPage,
                currentPage: page,
                limit
            },
            pets
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const PetController = {
    findAll
}