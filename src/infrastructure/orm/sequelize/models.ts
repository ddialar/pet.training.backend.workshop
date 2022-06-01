import { Model, DataTypes, UUIDV4 } from 'sequelize'
import { sequelize } from './connection'
import { UserData, UserProfileData } from '@types'

// ###################################################
// #####                  USER                   #####
// ###################################################

type UserCreationAttributes = Omit<UserData, 'id' | 'enabled' | 'createdAt' | 'updatedAt'>
class UserModel extends Model<UserData, UserCreationAttributes> {}

UserModel.init({
  id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: false, allowNull: false, unique: true, defaultValue: UUIDV4 },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
}, {
  sequelize,
  timestamps: true,
  modelName: 'UserModel',
  tableName: 'user'
})

// ###################################################
// #####                 PROFILE                 #####
// ###################################################

class UserProfileModel extends Model<UserProfileData, UserProfileData> {}

UserProfileModel.init({
  userId: { type: DataTypes.UUID, primaryKey: false, allowNull: false, unique: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  timestamps: false,
  modelName: 'UserProfileModel',
  tableName: 'profile'
})

// ###################################################
// #####                 USER-PET                #####
// ###################################################

// class UserPetModel extends Model<UserPetData, UserPetData> {}

// UserPetModel.init({
//   id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, unique: true },
//   userId: { type: DataTypes.UUID, primaryKey: false, allowNull: false },
//   petId: { type: DataTypes.UUID, primaryKey: false, allowNull: false }
// }, {
//   sequelize,
//   timestamps: false,
//   modelName: 'UserPetModel',
//   tableName: 'user_pet'
// })

// ###################################################
// #####              RELATIONSHIPS              #####
// ###################################################

UserModel.hasOne(UserProfileModel, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
    field: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})

export {
  UserModel,
  UserProfileModel
}
