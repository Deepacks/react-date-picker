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
import styles from "./styles/Button.module.scss";
var Button = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.onClick, onClick = _c === void 0 ? function () { } : _c;
    return (_jsx("button", __assign({ onClick: onClick, className: "".concat(styles.button_filled, " ").concat(className) }, { children: children })));
};
export default Button;
