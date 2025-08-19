// 'use strict';
// const commonUtils = require('../utils/common/index.js');
// async function loadModule() {
//     const commonUtils = await import('../../utils/common/index.js'); // Import dynamically
//     return commonUtils;
// }
// import { convertToYYYYMMDD, generateUUID } from '../utils/common/index.js';
const dotenv = require('dotenv');
const { Op } = require('sequelize');

dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const events = [
            {
                name: 'Deva',
                type: 'Movie',
                description:
                    'DEVA is an edge-of-the-seat, power-packed thriller about a brilliant yet rebellious police officer investigating a high-profile murder case.',
                cast: JSON.stringify([
                    {
                        'Shahid Kapoor': 'Dev Ambre',
                    },
                    {
                        'Pooja Hegde': 'Actor',
                    },
                    {
                        'Pavail Gulatie': 'Actor',
                    },
                    {
                        'Kubbra Sait': 'Actor',
                    },
                    {
                        'Pravessh Rana': 'Actor',
                    },
                ]),
                duration: 156,
                genre: ['Action', 'Thriller'],
                language: ['Hindi'],
                releaseDate: '2025-01-31',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Captain America: Brave New World',
                type: 'Movie',
                description:
                    'It is a sequel to Marvel Studios "The Falcon and the Winter Soldier" and follows Sam Wilson as the new Captain America.',
                cast: JSON.stringify([
                    {
                        'Anthony Mackie': 'Sam Wilson / Captain America',
                    },
                    {
                        'Harrison Ford': 'Actor',
                    },
                    {
                        'Tim Blake Nelson': 'Actor',
                    },
                    {
                        'Liv Tyler': 'Actor',
                    },
                    {
                        'Roza Salazar': 'Actor',
                    },
                    {
                        'Shira Haas': 'Actor',
                    },
                ]),
                duration: 118,
                genre: ['Action', 'Adventure', 'Sci-Fi'],
                language: ['English', 'Hindi', 'Tamil', 'Telugu'],
                releaseDate: '2025-02-14',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Zindagi Na Milegi Dobara',
                type: 'Movie',
                description:
                    'Before getting married, Kabir goes on a bachelor trip to Spain with his best friends Arjun and Imraan. On their trip, the boys learn new things about themselves and gain a new perspective on love, life, and relationships.',
                cast: JSON.stringify([
                    {
                        'Hrithik Roshan': 'Arjun Saluja',
                    },
                    {
                        'Abhay Deol': 'Kabir Dewan',
                    },
                    {
                        'Farhan Akhtar': 'Imraan Qureshi',
                    },
                    {
                        'Katrina Kaif': 'Laila',
                    },
                    {
                        'Kalki Koechlin': 'Natasha Arora',
                    },
                    {
                        'Deepti Naval': 'Raahila Qureshi',
                    },
                    {
                        'Naseeruddin Shah': 'Salman Habib',
                    },
                ]),
                duration: 153,
                genre: ['Adventure', 'Comedy', 'Drama'],
                language: ['Hindi'],
                releaseDate: '2011-07-15',
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Raid 2',
                type: 'Movie',
                description: 'Amay Patnaik is back!',
                cast: JSON.stringify([
                    {
                        'Ajay Devgn': 'Amay Patnaik',
                    },
                    {
                        'Vaani Kapoor': 'Actor',
                    },
                    {
                        'Ritesh Deshmukh': 'Actor',
                    },
                ]),
                // duration: 118,
                genre: ['Drama', 'Thriller'],
                language: ['Hindi'],
                releaseDate: '2025-05-01',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Jo Bolta Hai Wohi Hota Hai feat Harsh Gujral',
                type: 'Events',
                subType: 'Comedy Show',
                description:
                    'It takes exemplary courage to sit in the first two rows of a Harsh Gujral`s show because he will get you with his highly witty yet charming style.',
                cast: JSON.stringify([
                    {
                        'Harsh Gujral': '',
                    },
                ]),
                duration: 100,
                genre: ['Comedy'],
                language: ['English', 'Hindi'],
                releaseDate: '2025-02-27',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        try {
            const commonUtils = await import('../utils/common/index.js');
            const dotenv = await import('dotenv');
            dotenv.config();

            events.forEach((event) => {
                event.subType = event.subType || '';
                event.eventId = commonUtils.generateUUID(
                    `${event.name}#${event.type}#${event.subType}`,
                    process.env.EVENT_DB_IDENTIFIER ||
                        '4ac82e40-efca-11ef-835e-1da10f3a577f'
                );
                event.releaseDate = commonUtils.convertToYYYYMMDD(
                    event.releaseDate
                );
            });

            await queryInterface.bulkInsert('Events', events, {});
        } catch (error) {
            console.error('Error importing commonUtils:', error);
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete(
            'Events',
            {
                [Op.or]: [
                    { name: 'Deva' },
                    { name: 'Captain America: Brave New World' },
                    { name: 'Zindagi Na Milegi Dobara' },
                    { name: 'Raid 2' },
                    { name: 'Jo Bolta Hai Wohi Hota Hai feat Harsh Gujral' },
                ],
            },
            {}
        );
    },
};
