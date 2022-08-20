import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import envConfigs from "../database/config/config.js";
import * as dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

let thePort = config.port
let theHost = config.host
let thePass = config.password
let theDb = config.database
let theUser = config.username
let theDialect = config.dialect

// create sequelize db instacne.
const sequelize = new Sequelize(`${theDialect}://${theUser}:${thePass}@${theHost}/${theDb}`, {
  theHost,
  thePort,
  dialect: theDialect,
  logging: false
})

export {
  sequelize
};