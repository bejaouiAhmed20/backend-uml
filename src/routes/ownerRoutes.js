const express = require('express');
const router = express.Router();
const { signup, login,getOwnerById,editProfile,deleteOwnerByIdController,getAllOwnersController } = require('../controllers/ownerController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getOwnerById);
router.put('/:id', editProfile);
router.get("/allOwners", getAllOwnersController);
// router.put("/updateOwner/:id", updateOwnerById);
router.delete("/deleteOwner/:id", deleteOwnerByIdController);


module.exports = router;
