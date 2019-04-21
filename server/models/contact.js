'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};
