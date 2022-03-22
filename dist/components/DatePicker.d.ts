import { FunctionComponent } from "react";
interface DatePickerProps {
    value: string;
    onChange: (utcString: string) => void;
}
declare const DatePicker: FunctionComponent<DatePickerProps>;
export default DatePicker;
