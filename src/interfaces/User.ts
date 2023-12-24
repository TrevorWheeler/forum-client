import Joi from 'joi'

export interface User {
  _id: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export interface Credentials {
  username: string
  password: string
}

export const credentialsSchema = Joi.object<Credentials>({
  username: Joi.string().required().messages({
    'string.base': `Username should be a type of 'text'`,
    'string.empty': `Username cannot be an empty field`,
    'any.required': `Username is a required field`
  }),
  password: Joi.string().required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Username cannot be an empty field`,
    'any.required': `Password is a required field`
  })
}).required()
