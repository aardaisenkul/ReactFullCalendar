let eventGuid = 0
//let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        allDay: true,
        customer: "bengisu",
        description: "amar yicek",
        end: "2020-11-30T05:12:00",
        hours: "5",
        id: 2,
        project: "şirket işi",
        start: "2020-11-30T05:12:00",
        type: "kalamar"
    },
    {
        id: 0,
        title: 'All-day event',
        description: "amcıksın",
        start: "2020-11-29T00:00:00",
        end: "2020-11-29T00:00:00",
        customer: "arda",
        project: "kalamar",
        type: "kalamar",
        hours: "5",
        allDay: true
    }
]

export function createEventId() {
    return String(eventGuid++)
}
