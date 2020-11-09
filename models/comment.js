module.exports = function (sequelize, DataTypes) {
  let comment = sequelize.define(
    "comment",
    {
      userid: {
        field: "userid",
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      contents: {
        field: "contents",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      boardname: {
        field: "boardname",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      boardid: {
        field: "boardid",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "comment",
    }
  );

  comment.associate = function (models) {
    comment.belongsTo(models.Bulletin, {
      // foreignKey: "id",
      // onDelete: "cascade",
    });
  };

  return comment;
};
