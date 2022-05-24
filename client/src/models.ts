import {Factor} from './types'

export type GetApiFactorsResponse =
  | {
      success: true
      data: {
        familyFactors: Factor[]
        userFactors: Factor[]
      }
    }
  | {
      success: false
      msg: string
    }

export type PostApiFactorsRequest = {
  birthDate: Date
  gender: string
  familyFactors: number[]
  userFactors: number[]
}

export type PostApiFactorsResponse = {
  success: boolean,
  msg: string,
}
