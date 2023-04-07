import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
})
export const UserModel = mongoose.model("User", UserSchema)


export const getUsers = async () => UserModel.find({})
export const getUserByEmail = async (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = async (sessionToken: string) => UserModel.findOne({ 
  'authenfication.sessionToken': sessionToken
})
export const getUserById = async (id: string) => UserModel.findOne({ _id: id })
export const createUser = async (values: Record<string, any>) => new UserModel(values)
.save().then((user) => user.toObject())
export const deleteUserById = async (id: string) => UserModel.deleteOne({ _id:id})
export const updateUserById = async (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)