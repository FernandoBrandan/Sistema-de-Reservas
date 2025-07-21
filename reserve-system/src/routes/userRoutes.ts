
import { Router } from "express"
const router = Router()

import { create, findByEmail, findById, all } from "../repositories/userRepository"

router.post("/", async (req, res) => {
    const { email, name } = req.body
    await create(req.body)
    res.status(201).send()
})

router.get("/", async (req, res) => {
    const users = await all()
    res.json(users)
})

router.get("/:email", async (req, res) => {
    const user = await findByEmail(req.params.email)
    res.json(user)
})

router.get("/:id", async (req, res) => {
    const user = await findById(req.params.id)
    res.json(user)
})

export default router