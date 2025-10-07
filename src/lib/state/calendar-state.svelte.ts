import { invoke } from '@tauri-apps/api/core';

interface DatabaseEvent {
    id: number;
    datetime: number;
    duration: number | null;
    title: string;
    description: string | null;
}

export interface CalendarEvent {
    id: number;
    datetime: Date;
    duration: number | null;
    title: string;
    description: string | null;
}

export class CalendarState {
    viewMode: 'day' | 'week' | 'month' = $state('month');
    currentDate: Date = $state(new Date());
    selectedDate: Date | null = $state(null);
    calendarEvents: CalendarEvent[] = $state([]);

    setYear(year: number) {
        this.currentDate = new Date(year, this.currentDate.getMonth(), this.currentDate.getDate());
    }

    incrementYear() {
        this.setYear(this.currentDate.getFullYear() + 1);
    }

    decrementYear() {
        this.setYear(this.currentDate.getFullYear() - 1);
    }

    setMonth(month: number) {
        this.currentDate = new Date(this.currentDate.getFullYear(), month, 1);
        this.selectedDate = null;
    }

    incrementMonth() {
        this.setMonth(this.currentDate.getMonth() + 1);
        this.reloadEvents();
    }

    decrementMonth() {
        this.setMonth(this.currentDate.getMonth() - 1);
        this.reloadEvents();
    }

    setDay(day: number) {
        this.currentDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            day,
        );
    }

    async getEventsForMonth(): Promise<CalendarEvent[]> {
        let output: CalendarEvent[] = [];

        let events = await invoke('query_events_between', {
            start: Math.round(calendarState.currentDate.getTime() / 1000),
            end: Math.round(
                new Date(
                    this.currentDate.getFullYear(),
                    this.currentDate.getMonth() + 1,
                    1,
                ).getTime() / 1000,
            ),
        });

        (events as DatabaseEvent[]).forEach((value) => {
            output.push({
                id: value.id,
                datetime: new Date(value.datetime * 1000),
                duration: value.duration,
                title: value.title,
                description: value.description,
            });
        });

        return output;
    }

    async reloadEvents() {
        calendarState.calendarEvents = await this.getEventsForMonth();
    }

    selectDay(date: Date) {
        this.selectedDate = date;
    }

    addEvent(event: CalendarEvent) {
        this.calendarEvents.push(event);
    }

    getEventsOnDay(day: number): CalendarEvent[] {
        let output: CalendarEvent[] = [];

        this.calendarEvents.forEach((calendarEvent) => {
            if (calendarEvent.datetime.getDate() - 1 == day) {
                console.log(calendarEvent.datetime.getTime(), calendarEvent.datetime.getDate());
                output.push(calendarEvent);
            }
        });

        return output;
    }
}

export const calendarState = new CalendarState();
