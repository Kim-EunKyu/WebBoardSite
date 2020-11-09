module.exports = function (sequelize, DataTypes) {
  let bulletin = sequelize.define(
    "bulletin",
    {
      userid: {
        field: "userid",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      title: {
        field: "title",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contents: {
        field: "contents",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbsup: {
        field: "thumbsup",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      thumbsdown: {
        field: "thumbsdown",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "bulletin",
    }
  );

  bulletin.associate = function (models) {
    bulletin.hasMany(models.Comment, {
      foreignKey: "id",
      onDelete: "cascade",
    });
  };

  return bulletin;
};
