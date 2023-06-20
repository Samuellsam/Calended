interface Member {
  name: string
}

export interface Team {
  name   : string,
  member?: Member[]
}