import express from "express";
import homeController from "../controller/homeController";
import homeControllerORM from "../controller/homeControllerORM";


let router = express.Router();

const initWebroute = (app) => {
    //Query
    router.get('/', homeController.getHomePage) // Không chuyền đối số vào funcition getHomePage vì js đã hỗ trợ chuyền
    router.get('/detail/:idUser', homeController.getDetailUser)
    router.post('/create', homeController.createUser)
    router.post('/delete-User', homeController.deleteUser)
    router.get('/edit-user/:idUser', homeController.getEditUser)
    router.post('/updateUser', homeController.postEditUser)


    //ORM
    router.get('/view-userORM', homeControllerORM.viewUserORM)

    router.get('/create-userORM', homeControllerORM.createUserORM)
    router.post('/create-userORM-post', homeControllerORM.post_createUserORM)

    router.get('/edit-userORM', homeControllerORM.editUserORM)
    router.post('/update-userORM-Post', homeControllerORM.updateUserORMPost)

    router.post('/delete-UserORM', homeControllerORM.deleteUserORMPost)

    return app.use(router)
}

export default initWebroute;