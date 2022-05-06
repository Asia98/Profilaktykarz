import {LocalStorageUser} from '../types'

export type LoginForm = {
  email: string
  password: string
}

export type LoginResponse =
  | {
      success: false
      msg: string
    }
  | (LocalStorageUser & {
      success: true
    })
