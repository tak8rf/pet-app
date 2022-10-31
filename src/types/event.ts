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
    color: "blue"| "red"|"limegreen"|"deepskyblue"|"dimgray"|"navy"|"orange"|"teal"|"royalblue",
    isEditable: boolean
}

export type DateItem = {
    date: number
    month: string
    dayEvents: EventItem[]
}