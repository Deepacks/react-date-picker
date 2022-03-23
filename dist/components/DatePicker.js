var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useMemo, useRef, useState, } from "react";
import { useClickAway } from "react-use";
import { HiOutlineCalendar, HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight, } from "react-icons/hi";
import { useFormatDateTime } from "./hooks/useFormatDateTime";
import { useBuildCalendar } from "./hooks/useBuildCalendar";
import styles from "./styles/DatePicker.module.scss";
import IconButton from "./IconButton";
import Button from "./Button";
var DatePicker = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var _b = useState(false), selectMode = _b[0], setSelectMode = _b[1];
    var _c = useState(false), disableClickAway = _c[0], setDisableClickAway = _c[1];
    var _d = useState(), activeDate = _d[0], setActiveDate = _d[1];
    var handleAnchorClick = useCallback(function () { return setSelectMode(!selectMode); }, [selectMode]);
    var handleAnchorHover = useCallback(function () { return setDisableClickAway(true); }, []);
    var handleAnchorLeave = useCallback(function () { return setDisableClickAway(false); }, []);
    var handleActiveDateChange = useCallback(function (newDate) {
        setActiveDate(newDate);
    }, []);
    var handleDonePress = useCallback(function (newUtcString) {
        onChange(newUtcString);
        setSelectMode(false);
    }, [onChange]);
    var handleCancelPress = useCallback(function () {
        setSelectMode(false);
    }, []);
    var DatePickerAnchor = useMemo(function () {
        return function DatePickerAnchorComponent(_a) {
            var stringDate = _a.stringDate, isSelect = _a.isSelect, onAnchorClick = _a.onAnchorClick, onAnchorHover = _a.onAnchorHover, onAnchorLeave = _a.onAnchorLeave;
            return (_jsxs("div", __assign({ className: "".concat(styles.datePicker_anchor_container, " ").concat(isSelect ? styles.datePicker_anchor_container_focus : ""), onClick: onAnchorClick, onMouseEnter: onAnchorHover, onMouseLeave: onAnchorLeave }, { children: [_jsxs("div", { children: [_jsx(HiOutlineCalendar, {}), _jsxs("div", __assign({ className: "".concat(styles.datePicker_anchor_label_container, " ").concat(stringDate.length > 0
                                    ? styles.datePicker_anchor_label_container_with_value
                                    : "") }, { children: [_jsx("h6", __assign({ className: stringDate.length > 0
                                            ? ""
                                            : styles.datePicker_anchor_placeholder_extended }, { children: "Select a day" })), _jsx("div", __assign({ className: stringDate.length > 0
                                            ? ""
                                            : styles.datePicker_anchor_value_retracted }, { children: useFormatDateTime(stringDate).date }))] }))] }), _jsx(HiOutlineChevronDown, { className: isSelect ? styles.datePicker_svg_arrow_active : "" })] })));
        };
    }, []);
    var DatePickerMenu = useMemo(function () {
        return function DatePickerMenuComponent(_a) {
            var isSelect = _a.isSelect, stringDate = _a.stringDate, activeInnerDate = _a.activeInnerDate, isClickAwayDisabled = _a.isClickAwayDisabled, onDatePress = _a.onDatePress, onDonePress = _a.onDonePress, onCancelPress = _a.onCancelPress;
            var menuRef = useRef();
            useClickAway(menuRef, function () {
                if (isClickAwayDisabled || !isSelect)
                    return;
                setSelectMode(!isSelect);
                if (stringDate.length > 0) {
                    var actualDate = new Date(stringDate);
                    setActiveDate(actualDate);
                    goToDateMonth(actualDate);
                }
                else
                    goToDateMonth(new Date());
            });
            var _b = useBuildCalendar(), daysInMonth = _b.daysInMonth, firstDayOfMonth = _b.firstDayOfMonth, currentMonth = _b.currentMonth, currentYear = _b.currentYear, getPrevMonthLastDays = _b.getPrevMonthLastDays, getNextMonth = _b.getNextMonth, getPrevMonth = _b.getPrevMonth, goToDateMonth = _b.goToDateMonth, getWeekDayLetter = _b.getWeekDayLetter, getMonthName = _b.getMonthName;
            var handlePrevMonth = useCallback(function () {
                getPrevMonth();
            }, [getPrevMonth]);
            var handleNextMonth = useCallback(function () {
                getNextMonth();
            }, [getNextMonth]);
            var compareDateToSelected = useCallback(function (dayNumber) {
                return (new Date(currentYear, currentMonth - 1, dayNumber).getTime() ===
                    new Date(stringDate).getTime());
            }, [currentMonth, currentYear, stringDate]);
            var compareDateToActive = useCallback(function (dayNumber) {
                return (new Date(currentYear, currentMonth - 1, dayNumber).getTime() ===
                    (activeInnerDate === null || activeInnerDate === void 0 ? void 0 : activeInnerDate.getTime()));
            }, [currentMonth, currentYear, activeInnerDate]);
            var handleDatePress = useCallback(function (dayNumber) {
                onDatePress(new Date(currentYear, currentMonth - 1, dayNumber));
            }, [currentMonth, currentYear, onDatePress]);
            var handleCancelClick = useCallback(function () {
                onCancelPress();
                if (stringDate.length > 0) {
                    var actualDate = new Date(stringDate);
                    setActiveDate(actualDate);
                    goToDateMonth(actualDate);
                }
                else
                    goToDateMonth(new Date());
            }, [goToDateMonth, onCancelPress, stringDate]);
            var handleDoneClick = useCallback(function () {
                onDonePress(activeInnerDate ? activeInnerDate.toUTCString() : "");
                if (activeInnerDate)
                    goToDateMonth(activeInnerDate);
                else
                    goToDateMonth(new Date());
            }, [activeInnerDate, goToDateMonth, onDonePress]);
            var DayBox = useMemo(function () {
                return function DayBoxComponent(_a) {
                    var _b = _a.innerValue, innerValue = _b === void 0 ? "" : _b, _c = _a.isPrevMonth, isPrevMonth = _c === void 0 ? false : _c, _d = _a.isNextMonth, isNextMonth = _d === void 0 ? false : _d, _e = _a.isDateActive, isDateActive = _e === void 0 ? function () { return false; } : _e, _f = _a.isDateSelected, isDateSelected = _f === void 0 ? function () { return false; } : _f, _g = _a.onBoxPress, onBoxPress = _g === void 0 ? function () { } : _g;
                    var handleBoxPress = useCallback(function () {
                        if (isPrevMonth || isNextMonth || typeof innerValue === "string")
                            return;
                        onBoxPress(innerValue);
                    }, [isNextMonth, isPrevMonth, onBoxPress, innerValue]);
                    return (_jsx("div", __assign({ className: "".concat(styles.datePicker_menu_day_container, " ").concat(isPrevMonth || isNextMonth
                            ? styles.datePicker_menu_day_prev_container
                            : ""), style: isPrevMonth || isNextMonth || typeof innerValue === "string"
                            ? {}
                            : { cursor: "pointer" }, onClick: isPrevMonth || isNextMonth || typeof innerValue === "string"
                            ? function () { }
                            : handleBoxPress }, { children: isPrevMonth || isNextMonth || typeof innerValue === "string" ? (innerValue) : (_jsx("div", __assign({ className: isDateSelected(innerValue)
                                ? styles.datePicker_menu_day_inner_selected
                                : isDateActive(innerValue)
                                    ? styles.datePicker_menu_day_inner_active
                                    : "" }, { children: innerValue }))) })));
                };
            }, []);
            return (_jsxs("div", __assign({ ref: menuRef, className: "".concat(styles.datePicker_menu_container, " ").concat(isSelect ? styles.datePicker_menu_container_open : "") }, { children: [_jsxs("section", __assign({ className: styles.datePicker_menu_header_flex }, { children: [_jsx("h4", { children: "".concat(getMonthName(currentMonth), " ").concat(currentYear) }), _jsxs("div", { children: [_jsx(IconButton, { Icon: HiOutlineChevronLeft, onClick: handlePrevMonth }), _jsx(IconButton, { Icon: HiOutlineChevronRight, onClick: handleNextMonth })] })] })), _jsx("section", { children: __spreadArray([], Array(7), true).map(function (x, index) { return (_jsx("div", __assign({ className: styles.datePicker_menu_days_row }, { children: index === 0 ? (__spreadArray([], Array(7), true).map(function (x, idx) { return (_jsx(DayBox, { innerValue: getWeekDayLetter(idx + 1) }, idx)); })) : index === 1 ? (_jsxs(_Fragment, { children: [getPrevMonthLastDays(firstDayOfMonth).map(function (day, idx) { return (_jsx(DayBox, { innerValue: day, isPrevMonth: true }, idx)); }), __spreadArray([], Array(7 - (firstDayOfMonth - 1)), true).map(function (x, idx) { return (_jsx(DayBox, { innerValue: idx + 1, onBoxPress: handleDatePress, isDateActive: compareDateToActive, isDateSelected: compareDateToSelected }, idx)); })] })) : index < 5 ? (__spreadArray([], Array(7), true).map(function (x, idx) { return (_jsx(DayBox, { innerValue: idx + (7 * (index - 1) + 1) - (firstDayOfMonth - 1), onBoxPress: handleDatePress, isDateActive: compareDateToActive, isDateSelected: compareDateToSelected }, idx)); })) : (_jsx(_Fragment, { children: __spreadArray([], Array(7), true).map(function (x, idx) {
                                    return idx + (7 * (index - 1) + 1) - (firstDayOfMonth - 1) <=
                                        daysInMonth ? (_jsx(DayBox, { innerValue: idx + (7 * (index - 1) + 1) - (firstDayOfMonth - 1), onBoxPress: handleDatePress, isDateActive: compareDateToActive, isDateSelected: compareDateToSelected }, idx)) : (_jsx(DayBox, { innerValue: idx +
                                            (7 * (index - 1) + 1) -
                                            (firstDayOfMonth - 1) -
                                            daysInMonth, isNextMonth: true }, idx));
                                }) })) }), index)); }) }), _jsxs("section", __assign({ className: styles.datePicker_menu_footer_flex }, { children: [_jsx("div", { children: _jsx(Button, __assign({ className: styles.datePicker_menu_footer_cancel_button, onClick: handleCancelClick }, { children: "Cancel" })) }), _jsx("div", { children: _jsx(Button, __assign({ onClick: handleDoneClick }, { children: "Done" })) })] }))] })));
        };
    }, []);
    return (_jsxs("div", __assign({ className: styles.datePicker_container }, { children: [_jsx(DatePickerAnchor, { isSelect: selectMode, stringDate: value, onAnchorClick: handleAnchorClick, onAnchorHover: handleAnchorHover, onAnchorLeave: handleAnchorLeave }), _jsx(DatePickerMenu, { isSelect: selectMode, stringDate: value, activeInnerDate: activeDate, isClickAwayDisabled: disableClickAway, onDatePress: handleActiveDateChange, onDonePress: handleDonePress, onCancelPress: handleCancelPress })] })));
};
export default DatePicker;
