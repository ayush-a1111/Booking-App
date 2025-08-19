'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Events', {
            eventId: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                defaultValue: 'Movie',
                allowNull: false,
            },
            subType: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
            },
            cast: {
                type: Sequelize.JSONB,
                defaultValue: [],
            },
            genre: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            language: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: ['Hindi'],
                allowNull: false,
            },
            releaseDate: {
                type: Sequelize.DATEONLY,
            },
            duration: {
                type: Sequelize.INTEGER,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Events');
    },
};
