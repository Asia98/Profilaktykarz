export type LastVisit = {
  id: number
  lastCheckupDate: string
  resultGood: boolean
}

export type LastVisitWithName = LastVisit & {name: string}
