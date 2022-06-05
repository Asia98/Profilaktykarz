import {LocalStorageUser} from '@/auth/types'
import {
  GetApiCheckupFormStatusResponse,
  GetApiFactorsResponse,
  GetApiInfoFormStatusResponse,
  GetApiLastVisitsResponse,
  GetApiUserCalendarResponse,
  PostApiCustomVisitRequest,
  PostApiCustomVisitResponse,
  PostApiFactorsRequest,
  PostApiFactorsResponse,
  PostApiLastVisitsRequest,
  PostApiLastVisitsResponse,
} from '@/models'

export const getApiFactors = async () => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser

  const response = await fetch('http://localhost:5000/api/factors', {
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'GET',
  })

  return (await response.json()) as GetApiFactorsResponse
}

export const postApiFactors = async (req: PostApiFactorsRequest) => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser

  const response = await fetch('http://localhost:5000/api/factors', {
    body: JSON.stringify(req),
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'POST',
  })

  return (await response.json()) as PostApiFactorsResponse
}

export const getApiLastVisits = async () => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser

  const response = await fetch('http://localhost:5000/api/last-visits', {
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'GET',
  })

  return (await response.json()) as GetApiLastVisitsResponse
}

export const getInfoFormStatus = async () => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser

  const response = await fetch('http://localhost:5000/api/users/info-form-status', {
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'GET',
  })

  return (await response.json()) as GetApiInfoFormStatusResponse
}

export const getCheckupFormStatus = async () => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser

  const response = await fetch('http://localhost:5000/api/users/checkup-form-status', {
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'GET',
  })

  return (await response.json()) as GetApiCheckupFormStatusResponse
}

export const getApiUserCalendar = async () => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser

  const response = await fetch('http://localhost:5000/api/user-calendar', {
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'GET',
  })

  return (await response.json()) as GetApiUserCalendarResponse
}

export const postApiLastVisits = async (req: PostApiLastVisitsRequest) => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser
  const response = await fetch('http://localhost:5000/api/last-visits', {
    body: JSON.stringify(req),
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'POST',
  })

  return (await response.json()) as PostApiLastVisitsResponse
}

export const postApiCustomVisit = async (req: PostApiCustomVisitRequest) => {
  const localStorageUser = localStorage.getItem('profilaktykarzUser')
  if (!localStorageUser) {
    throw new Error('User is not authenticated')
  }
  const user = JSON.parse(localStorageUser) as LocalStorageUser
  const response = await fetch('http://localhost:5000/api/custom-visit', {
    body: JSON.stringify(req),
    headers: {Authorization: user.token, 'Content-Type': 'application/json'},
    method: 'GET',
  })

  return (await response.json()) as PostApiCustomVisitResponse
}
