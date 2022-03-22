import { useEffect, useState } from "react";
export var useFormatDateTime = function (utcDateString) {
    var _a = useState(), dateObj = _a[0], setDateObj = _a[1];
    useEffect(function () {
        if (!utcDateString)
            return;
        setDateObj(new Date(utcDateString));
    }, [utcDateString]);
    var formatTimeString = function (value) {
        if (value.toString().length === 1)
            return "0" + value;
        else
            return value.toString();
    };
    return {
        date: dateObj
            ? "".concat(formatTimeString(dateObj.getDate()), "/").concat(dateObj.getMonth() + 1)
            : "",
        time: dateObj
            ? "".concat(formatTimeString(dateObj.getHours()), ":").concat(formatTimeString(dateObj.getMinutes()))
            : "",
    };
};
