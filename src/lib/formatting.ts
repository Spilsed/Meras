export const month_names: Map<number, string> = new Map([
    [0, 'Janurary'],
    [1, 'Feburary'],
    [2, 'March'],
    [3, 'April'],
    [4, 'May'],
    [5, 'June'],
    [6, 'July'],
    [7, 'August'],
    [8, 'September'],
    [9, 'October'],
    [10, 'November'],
    [11, 'December'],
]);

export function monthIndexToName(index: number): string {
    if (index >= 0 && index <= 11) {
        return month_names.get(index)!;
    } else {
        return 'UNK';
    }
}

export function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstSundayOfMonth(date: Date): number {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDay.getDay();
    const daysToAdd = (6 - dayOfWeek) % 7;

    firstDay.setDate(1 + daysToAdd);

    return firstDay.getDate();
}
