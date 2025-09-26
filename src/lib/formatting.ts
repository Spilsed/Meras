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

export function month_index_to_name(index: number): string {
    if (index >= 0 && index <= 11) {
        return month_names.get(index)!;
    } else {
        return 'UNK';
    }
}
