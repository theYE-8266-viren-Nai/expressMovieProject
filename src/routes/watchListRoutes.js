import express from 'express';
import {addToWatchList , deleteWatchList , updateWatchList} from '../controller/watchlistController.js'
const router = express.Router()


router.post("/" , addToWatchList)
router.delete('/:id',deleteWatchList)
router.put('/:id',updateWatchList)

export default router