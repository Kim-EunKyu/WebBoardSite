module.exports = function (sequelize, DataTypes) {
  let user = sequelize.define(
    "user",
    {
      userid: {
        field: "userid",
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "user",
    }
  );
  return user;
};
