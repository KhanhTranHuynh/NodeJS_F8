import { json } from "body-parser";
import pool from "../config/commectDBWithQuery";//Use the command Query
import connectDB from '../config/connectDB'
import db from '../models/index';//Use the ORM
import multer from "multer";
import path from 'path';

let getHomePage = async (req, res) => {
    // const [data] = await pool.execute('SELECT * FROM `users`');
    // return res.render('index.ejs', { userData: data })

    const data = await db.User.findAll();
    return res.render('index.ejs', { userData: data })
}

let getDetailUser = async (req, res) => {
    let userID = req.params.idUser //Giá trị từ file index.ejs chuyển qua file web.js, req.params lấy giá trị từ web.js
    const [data] = await pool.execute('select * from `users` where Id = ?', [userID]);
    return res.send(JSON.stringify(data[0]))
}

let createUser = async (req, res) => {
    let { firstName, lastName, email } = req.body //Trả về key:values trong phần body của request
    await pool.execute(
        'insert into `users`(firstName, lastName, email) values (?,?,?)',
        [firstName, lastName, email]
    )
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let idUser = req.body.iduser
    await pool.execute('delete from users where Id = ?', [idUser])
    return res.redirect('/')
}

let getEditUser = async (req, res) => {
    let userID = req.params.idUser
    const [data] = await pool.execute('select * from `users` where Id = ?', [userID])
    return res.render('./updateUser.ejs', { userData: data[0] })
}

let postEditUser = async (req, res) => {
    let { firstName, lastName, Email, Address, Id } = req.body
    await pool.execute(
        'update users set firstName = ?,lastName = ?,Email=?,Address=? where Id = ?',
        [firstName, lastName, Email, Address, Id]
    )
    return res.redirect('/')
}

let searchUsers = async (req, res, next) => {
    let searchUsers = req.body.searchUsers
    console.log(searchUsers);
    const [data] = await pool.execute('SELECT * FROM `users` WHERE firstName = ?', [searchUsers])
    return res.send(JSON.stringify(data[0]))
}

module.exports = {
    getHomePage, getDetailUser, createUser, deleteUser, getEditUser, postEditUser, searchUsers
}