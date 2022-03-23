var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useRef, useState } from "react";
export var useBuildCalendar = function () {
    var today = new Date();
    var thisMonth = useRef(today.getMonth() + 1);
    var thisYear = useRef(today.getFullYear());
    var _a = useState(new Date(thisYear.current, thisMonth.current, 0).getDate()), daysInMonth = _a[0], setDaysInMonth = _a[1];
    var _b = useState(new Date(thisYear.current + "-" + thisMonth.current + "-01").getDay() === 0
        ? 7
        : new Date(thisYear.current + "-" + thisMonth.current + "-01").getDay()), firstDayOfMonth = _b[0], setFirstDayOfMonth = _b[1];
    var getPrevMonthLastDays = function (offset) {
        if (offset === 0)
            return [];
        var daysInPrevMonth = new Date(thisMonth.current === 1 ? thisYear.current - 1 : thisYear.current, thisMonth.current === 1 ? 12 : thisMonth.current - 1, 0).getDate();
        return __spreadArray([], Array(offset - 1), true).map(function (x, idx) { return daysInPrevMonth - idx; })
            .reverse();
    };
    var getNextMonth = function () {
        var nextMonth = thisMonth.current === 12 ? 1 : thisMonth.current + 1;
        var nextYear = thisMonth.current === 12 ? thisYear.current + 1 : thisYear.current;
        setDaysInMonth(new Date(nextYear, nextMonth, 0).getDate());
        var firstDay = new Date(nextYear + "-" + nextMonth + "-01").getDay();
        setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay);
        thisMonth.current = nextMonth;
        thisYear.current = nextYear;
    };
    var getPrevMonth = function () {
        var prevMonth = thisMonth.current === 1 ? 12 : thisMonth.current - 1;
        var prevYear = thisMonth.current === 1 ? thisYear.current - 1 : thisYear.current;
        setDaysInMonth(new Date(prevYear, prevMonth, 0).getDate());
        var firstDay = new Date(prevYear + "-" + prevMonth + "-01").getDay();
        setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay);
        thisMonth.current = prevMonth;
        thisYear.current = prevYear;
    };
    var goToDateMonth = function (date) {
        var goToMonth = date.getMonth() + 1;
        var goToYear = date.getFullYear();
        setDaysInMonth(new Date(goToYear, goToMonth, 0).getDate());
        var firstDay = new Date(goToYear + "-" + goToMonth + "-01").getDay();
        setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay);
        thisMonth.current = goToMonth;
        thisYear.current = goToYear;
    };
    var getWeekDayLetter = function (weekDay) {
        switch (weekDay) {
            case 1:
                return "M";
            case 2:
                return "T";
            case 3:
                return "W";
            case 4:
                return "T";
            case 5:
                return "F";
            case 6:
                return "S";
            case 7:
                return "S";
            default:
                return "";
        }
    };
    var getMonthName = function (monthNumber) {
        switch (monthNumber) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
            default:
                return "";
        }
    };
    return {
        daysInMonth: daysInMonth,
        firstDayOfMonth: firstDayOfMonth,
        currentMonth: thisMonth.current,
        currentYear: thisYear.current,
        getPrevMonthLastDays: getPrevMonthLastDays,
        getNextMonth: getNextMonth,
        getPrevMonth: getPrevMonth,
        goToDateMonth: goToDateMonth,
        getWeekDayLetter: getWeekDayLetter,
        getMonthName: getMonthName,
    };
};
