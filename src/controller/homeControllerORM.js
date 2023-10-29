import { json } from "body-parser";
import db from '../models/index';//Use the ORM
import pool from "../config/commectDBWithQuery";//Use the command Query
import path from 'path';
import CRUDservice from '../services/CRUDservice'


let createUserORM = async (req, res) => {
    const data = await db.User.findOne();
    return res.render('create-user-ORM.ejs', { userData: data })
}

let post_createUserORM = async (req, res) => {
    await CRUDservice.createNewUser(req.body);
    return res.send('okokok')
    // const data = await CRUDservice.viewUser();//Nó đang nhận là một Object phải chuyển đổi sang Array
    //return res.render('view-user-ORM.ejs', { userData: data })
}

let viewUserORM = async (req, res) => {
    const data = await CRUDservice.viewUser();//Nó đang nhận là một Object phải chuyển đổi sang Array
    return res.render('view-user-ORM.ejs', { userData: data })
}

let editUserORM = async (req, res) => {
    const data = await db.User.findOne({ where: { id: req.query.id } });
    return res.render('edit-user-ORM.ejs', { userData: data })
}

let updateUserORMPost = async (req, res) => {
    await CRUDservice.updateUserORM(req.body);//Nó đang nhận là một Object phải chuyển đổi sang Array
    const data = await CRUDservice.viewUser();
    return res.render('view-user-ORM.ejs', { userData: data })
}

let deleteUserORMPost = async (req, res) => {
    await CRUDservice.deleteUserORM(req.body.id);//Nó đang nhận là một Object phải chuyển đổi sang Array
    const data = await CRUDservice.viewUser();
    return res.render('view-user-ORM.ejs', { userData: data })
}

module.exports = {
    createUserORM, post_createUserORM, viewUserORM, editUserORM, updateUserORMPost, deleteUserORMPost
}