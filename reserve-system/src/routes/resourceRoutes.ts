import { Router } from 'express'
const router = Router()
import { create, findAll, findById, findByType } from '../repositories/resourceRepository'

router.post('/', async (req, res) => {
    const resourceData = req.body
    const resource = await create(resourceData)
    res.status(201).json(resource)
})

router.get('/', async (req, res) => {
    const resources = await findAll()
    res.status(200).json(resources)
})

export default router