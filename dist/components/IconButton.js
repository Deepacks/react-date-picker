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
import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./styles/IconButton.module.scss";
var IconButton = function (_a) {
    var Icon = _a.Icon, _b = _a.onClick, onClick = _b === void 0 ? function () { } : _b;
    return (_jsx("button", __assign({ className: styles.iconButton_button_simple, onClick: onClick }, { children: _jsx(Icon, {}) })));
};
export default IconButton;
