let Message = (sequelize, DataTypes) => {
  let Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'messages',
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  })
  return Message
}

export default Message
