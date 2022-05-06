export type SignupForm = {
  email: string
  password: string
  username: string
}

export type SignupResponse =
  | {
      success: false
      msg: string
    }
  | {
      success: true
      token: string
    }
