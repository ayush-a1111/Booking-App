// const { Model } = require('sequelize');
import { Model } from 'sequelize';
import dotenv from 'dotenv';
import { generateUUID, convertToYYYYMMDD } from '../utils/common/index.js';

dotenv.config();

export default (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Event.init(
        {
            eventId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                defaultValue: 'Movie',
                allowNull: false,
            },
            subType: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.STRING,
            cast: {
                type: DataTypes.JSONB,
                defaultValue: [],
            },
            genre: DataTypes.ARRAY(DataTypes.STRING),
            language: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: ['Hindi'],
                allowNull: false,
            },
            releaseDate: DataTypes.DATEONLY,
            duration: DataTypes.INTEGER,
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Event',
            hooks: {
                beforeValidate: (event) => {
                    const subType = event.subType || '';
                    event.eventId = generateUUID(
                        `${event.name}#${event.type}#${subType}`,
                        process.env.EVENT_DB_IDENTIFIER
                    );
                    event.releaseDate = convertToYYYYMMDD(event.releaseDate);
                },
            },
        }
    );

    return Event;
};
