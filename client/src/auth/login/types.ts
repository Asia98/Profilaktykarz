export type LoginForm = {
  email: string
  password: string
}

export type LoginResponse =
  | {
      success: false
      msg: string
    }
  | {
      success: true
      token: string
    }
