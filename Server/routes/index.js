'use strict'

import { Router } from 'express';
import {
  deleteFact,
  getFactById,
  getFacts,
  updateFact,
  createFacts
} from './../controller/v1/catFactController.js';

const router = Router({
  caseSensitive: false
})

router.post('/create', createFacts)
router.get('/get', getFacts)
router.get('/get/:factId', getFactById)
router.put('/update/:factId', updateFact)
router.delete('/delete/:factId',deleteFact)

export default router;