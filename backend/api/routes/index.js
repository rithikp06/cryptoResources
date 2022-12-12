import express from "express";
import { getResources, createResource, updateResources  } from "../controller/resources.js";
import { getUserData, updateFavorites } from "../controller/user.js";

var router = express.Router();

router.get('/resources/get', getResources);
router.get('/users/get', getUserData);
router.patch('/users/updateFavorites', updateFavorites);
router.post('/resources/create', createResource);
router.delete('/resources/update', updateResources);

export default router;
