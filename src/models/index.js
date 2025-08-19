import { readdirSync } from 'fs';
import { basename as _basename, join, dirname } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import process from 'process';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const db = {};

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        ...dbConfig,
        logging: false, // Disable logging (optional)
    }
);

// Dynamically import all models
const files = readdirSync(__dirname).filter(
    (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
);

for (const file of files) {
    const { default: model } = await import(join(__dirname, file));
    const initializedModel = model(sequelize, DataTypes);
    db[initializedModel.name] = initializedModel;
}

// Run associations if defined
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
