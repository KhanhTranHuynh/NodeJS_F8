import express from "express";
import APIcontroller from '../controller/APIController'
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIcontroller.getAllUsers) // Không chuyền đối số vào funcition getHomePage vì js đã hỗ trợ chuyền

    return app.use('/api/v1', router)
}

export default initAPIRoute;