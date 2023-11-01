export declare function daysInMonth(month: number, year?: number): number;
export declare function isValid(day: number, month: number, year: number): boolean;
export declare enum Unit {
    day = "day",
    month = "month",
    year = "year"
}
export interface DateUnits {
    [Unit.day]?: number;
    [Unit.month]?: number;
    [Unit.year]?: number;
}
export declare function getCappedUnits({ day, month, year }: DateUnits): DateUnits;
