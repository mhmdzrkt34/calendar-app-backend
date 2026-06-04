'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`create database if not exists calendar_db`)
    await queryInterface.sequelize.query(`
      CREATE TABLE users_001 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at BIGINT not null,
      public_key VARCHAR(36) NOT NULL
      
      )
      `)
    await queryInterface.sequelize.query(`
      CREATE TABLE otps_001 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      created_at BIGINT not null,
      expires_at BIGINT not null,
      otp_code VARCHAR(6) NOT NULL,
      public_key VARCHAR(36) NOT NULL,
      is_used TINYINT(1) NOT NULL DEFAULT 0
      )
      `)
    await queryInterface.sequelize.query(`
      CREATE TABLE tasks_001 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT,
      description TEXT,
      public_key VARCHAR(36),
      start_data BIGINT,
      end_date BIGINT,
      created_at BIGINT,
      updated_at BIGINT,
      deleted TINYINT(1),
      user_id int
      )
      `)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`
        DROP TABLE IF EXISTS Users`)
    await queryInterface.sequelize.query(`
        DROP TABLE IF EXISTS Otps`)
    await queryInterface.sequelize.query(`
        DROP TABLE IF EXISTS Tasks`)    
  }
};
