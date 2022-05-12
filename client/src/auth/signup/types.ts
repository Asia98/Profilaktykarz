export type SignupForm = {
  email: string
  password: string
  username: string
}

export type SignupResponse = {
  msg: string
} & (
  | {
      success: false
    }
  | {
      success: true
      userID: string
    }
)
