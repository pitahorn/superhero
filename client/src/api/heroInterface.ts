export interface HeroInterface {
  filiationCoefficient: number,
  attacks: {
    mental: number,
    strong: number,
    fast: number,
  },
  healthPoints: number,
  powerstats: {
    intelligence ?: number,
    strength ?: number,
    speed ?: number,
    durability ?: number,
    power ?: number,
    combat ?: number,
  },
  id: number,
  name: string,
  biography: {
    aliases: string[],
    alignment: string,
    alterEgos: string,
    firstAppearance: string,
    fullName: string,
    placeOfBirth: string,
    publisher: string,
  },
  appearance: Record <string, string | number | string[] | null>,
  work: {
    base: string,
    occupation: string,
  },
  connections:Record <string, string | null>,
  image: {
    url: string,
  },
  actualStamina: {
    intelligence: number,
    strength: number,
    speed: number,
    durability: number,
    power: number,
    combat: number,
  }
}

export interface TeamInterface {
  alignment?: string,
  members?: HeroInterface[],
}

export interface HeroApiInterface {
  teamA: TeamInterface,
  teamB: TeamInterface,
}