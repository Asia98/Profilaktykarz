import {LocalStorageUser} from '@/auth/types'
import {GetApiFactorsResponse, GetApiLastVisitsResponse, PostApiFactorsRequest, PostApiFactorsResponse} from '@/models'

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
