let User = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'users',
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message)
      }
    }
  })
  return User
}

export default User
