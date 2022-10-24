export type EventState={
    events: EventItem[]
}

export type EventItem={
    id: number,
    pet_id: number,
    health: string,
    detail: string,
    start: Date,
    end: Date,
    color: string
}