export type PetState={
    pets: PetInfo[]
}

export type PetInfo={
    id: number,
    name: string,
    birthday: Date,
    age: number,
}