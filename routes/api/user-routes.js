const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addUserToFriendlist,
    deleteUserFromFriendlist
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
    
router
    .route('/:userId/friends/:friendId')
    .post(addUserToFriendlist)
    .delete(deleteUserFromFriendlist)

router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;