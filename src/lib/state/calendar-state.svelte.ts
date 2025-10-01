export interface Event {
    id: number;
    date: Date;
    title: string;
    description: string;
}

export class CalendarState {
    viewMode: 'day' | 'week' | 'month' = $state('month');
    currentDate: Date = $state(new Date());
    selectedDate: Date | null = $state(null);
    events: Event[] = $state([]);

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
    }

    decrementMonth() {
        this.setMonth(this.currentDate.getMonth() - 1);
    }

    selectDay(date: Date) {
        this.selectedDate = date;
    }

    addEvent(event: Event) {
        this.events.push(event);
    }
}

export const calendarState = new CalendarState();
