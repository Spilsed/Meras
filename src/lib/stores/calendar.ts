import { writable } from 'svelte/store';

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
}

export const events = writable<CalendarEvent[]>([]);

export const calendarActions = {
    setEvents: (newEvents: CalendarEvent[]) => {
        events.set(newEvents);
    },

    addEvent: (newEvent: CalendarEvent) => {
        events.update((currentEvents) => {
            return [...currentEvents, newEvent];
        });
    },

    updateEvent: (updatedEvent: CalendarEvent) => {
        events.update((currentEvents) => {
            return currentEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event,
            );
        });
    },

    removeEvent: (eventId: string) => {
        events.update((currentEvents) => {
            return currentEvents.filter((event) => event.id == eventId);
        });
    },
};
