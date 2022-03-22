export declare const useBuildCalendar: () => {
    daysInMonth: number;
    firstDayOfMonth: number;
    currentMonth: number;
    currentYear: number;
    getPrevMonthLastDays: (offset: number) => number[];
    getNextMonth: () => void;
    getPrevMonth: () => void;
    goToDateMonth: (date: Date) => void;
    getWeekDayLetter: (weekDay: number) => string;
    getMonthName: (monthNumber: number) => string;
};
