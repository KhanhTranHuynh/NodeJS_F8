import bcrypt from 'bcryptjs'
import db from '../models/index'
import pool from "../config/commectDBWithQuery";//Use the command Query
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

var salt = bcrypt.genSaltSync(10);

let hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);//~return. Do đang sử lý bắt đồng bộ của JS
        }
        catch (e) {
            reject(e);
        }
    })
}


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassWord(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            })
            resolve(); //~return. Do đang sử lý bắt đồng bộ của JS
        }
        catch (e) {
            reject(e);
        }
    })
}

let viewUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: false
            })
            resolve(data); //~return. Do đang sử lý bắt đồng bộ của JS
        }
        catch (e) {
            reject(e);
        }
    })
}

let updateUserORM = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            user.firstName = data.firstName
            user.lastName = data.lastName
            await user.save()
            resolve(); //~return. Do đang sử lý bắt đồng bộ của JS
        }
        catch (e) {
            reject(e);
        }
    })
}

let deleteUserORM = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data },
            })
            await user.destroy();
            resolve(); //~return. Do đang sử lý bắt đồng bộ của JS
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser, viewUser, updateUserORM, deleteUserORM
}