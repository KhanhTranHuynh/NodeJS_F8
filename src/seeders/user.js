'use strict';

module.exports = {
  //Đưa dữ liệu lên db bình thường
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'test@gamil.com',
      password: '12345',
      firstName: 'KTran',
      lastName: 'Huynh',
      address: 'Kien Giang',
      phoneNumber: '0868333224',
      gender: 1,
      roleId: 'R1',
      positionId: 'professor',
      image: 'test.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  //Đưa dữ liệu lên db khi rollback có vấn đề
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
