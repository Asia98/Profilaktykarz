import {CalendarEvent} from './calendar/types'
import {Factor, LastVisitCheckup} from './types'

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
  success: boolean
  msg: string
}

export type GetApiLastVisitsResponse = {
  success: boolean
  data: {
    checkups: LastVisitCheckup[]
  }
}

export type GetApiInfoFormStatusResponse = {
  medicalInfo: boolean
}

export type GetApiCheckupFormStatusResponse = {
  checkupHistory: boolean
}

export type GetApiUserCalendarResponse =
  | {
      success: true
      events: CalendarEvent[]
    }
  | {
      success: false
      msg: string
    }

export type PostApiCustomVisitRequest = {
  name: string
  lastCheckup: string
} & (
  | {
      cycle: number
    }
  | {
      nextCheckup: string
    }
)

export type PostApiCustomVisitResponse = {
  success: boolean
}
