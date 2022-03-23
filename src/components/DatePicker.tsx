import {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { useClickAway } from "react-use"
import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi"
import { useFormatDateTime } from "./hooks/useFormatDateTime"
import { useBuildCalendar } from "./hooks/useBuildCalendar"
import styles from "./styles/DatePicker.module.scss"

import IconButton from "./IconButton"
import Button from "./Button"

interface DatePickerProps {
  value: string
  onChange: (utcString: string) => void
}

interface DatePickerAnchorProps {
  isSelect: boolean
  stringDate: string
  onAnchorClick: () => void
  onAnchorHover: () => void
  onAnchorLeave: () => void
}

interface DatePickerMenuProps {
  isSelect: boolean
  stringDate: string
  activeInnerDate?: Date
  isClickAwayDisabled: boolean
  onDatePress: (newDate: Date) => void
  onDonePress: (newUtcString: string) => void
  onCancelPress: () => void
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  value,
  onChange,
}) => {
  const [selectMode, setSelectMode] = useState<boolean>(false)
  const [disableClickAway, setDisableClickAway] = useState<boolean>(false)
  const [activeDate, setActiveDate] = useState<Date>()

  const handleAnchorClick = useCallback(
    () => setSelectMode(!selectMode),
    [selectMode]
  )

  const handleAnchorHover = useCallback(() => setDisableClickAway(true), [])
  const handleAnchorLeave = useCallback(() => setDisableClickAway(false), [])

  const handleActiveDateChange: (newDate: Date) => void = useCallback(
    (newDate) => {
      setActiveDate(newDate)
    },
    []
  )

  const handleDonePress: (newUtcString: string) => void = useCallback(
    (newUtcString) => {
      onChange(newUtcString)
      setSelectMode(false)
    },
    [onChange]
  )

  const handleCancelPress: () => void = useCallback(() => {
    setSelectMode(false)
  }, [])

  const DatePickerAnchor: FunctionComponent<DatePickerAnchorProps> =
    useMemo(() => {
      return function DatePickerAnchorComponent({
        stringDate,
        isSelect,
        onAnchorClick,
        onAnchorHover,
        onAnchorLeave,
      }) {
        return (
          <div
            className={`${styles.datePicker_anchor_container} ${
              isSelect ? styles.datePicker_anchor_container_focus : ""
            }`}
            onClick={onAnchorClick}
            onMouseEnter={onAnchorHover}
            onMouseLeave={onAnchorLeave}
          >
            <div>
              <HiOutlineCalendar />
              <div
                className={`${styles.datePicker_anchor_label_container} ${
                  stringDate.length > 0
                    ? styles.datePicker_anchor_label_container_with_value
                    : ""
                }`}
              >
                <h6
                  className={
                    stringDate.length > 0
                      ? ""
                      : styles.datePicker_anchor_placeholder_extended
                  }
                >
                  Scegli un giorno
                </h6>
                <div
                  className={
                    stringDate.length > 0
                      ? ""
                      : styles.datePicker_anchor_value_retracted
                  }
                >
                  {useFormatDateTime(stringDate).date}
                </div>
              </div>
            </div>
            <HiOutlineChevronDown
              className={isSelect ? styles.datePicker_svg_arrow_active : ""}
            />
          </div>
        )
      }
    }, [])

  const DatePickerMenu: FunctionComponent<DatePickerMenuProps> = useMemo(() => {
    return function DatePickerMenuComponent({
      isSelect,
      stringDate,
      activeInnerDate,
      isClickAwayDisabled,
      onDatePress,
      onDonePress,
      onCancelPress,
    }) {
      const menuRef = useRef() as React.MutableRefObject<HTMLDivElement>
      useClickAway(menuRef, () => {
        if (isClickAwayDisabled || !isSelect) return
        setSelectMode(!isSelect)
      })

      const {
        daysInMonth,
        firstDayOfMonth,
        currentMonth,
        currentYear,
        getPrevMonthLastDays,
        getNextMonth,
        getPrevMonth,
        goToDateMonth,
        getWeekDayLetter,
        getMonthName,
      } = useBuildCalendar()

      const handlePrevMonth = useCallback(() => {
        getPrevMonth()
      }, [getPrevMonth])

      const handleNextMonth = useCallback(() => {
        getNextMonth()
      }, [getNextMonth])

      const compareDateToSelected: (dayNumber: number) => boolean = useCallback(
        (dayNumber) => {
          return (
            new Date(currentYear, currentMonth - 1, dayNumber).getTime() ===
            new Date(stringDate).getTime()
          )
        },
        [currentMonth, currentYear, stringDate]
      )

      const compareDateToActive: (dayNumber: number) => boolean = useCallback(
        (dayNumber) => {
          return (
            new Date(currentYear, currentMonth - 1, dayNumber).getTime() ===
            activeInnerDate?.getTime()
          )
        },
        [currentMonth, currentYear, activeInnerDate]
      )

      const handleDatePress: (dayNumber: number) => void = useCallback(
        (dayNumber) => {
          onDatePress(new Date(currentYear, currentMonth - 1, dayNumber))
        },
        [currentMonth, currentYear, onDatePress]
      )

      const handleCancelClick: () => void = useCallback(() => {
        onCancelPress()
        if (stringDate.length > 0) {
          const actualDate = new Date(stringDate)
          setActiveDate(actualDate)
          goToDateMonth(actualDate)
        } else goToDateMonth(new Date())
      }, [goToDateMonth, onCancelPress, stringDate])

      const handleDoneClick: () => void = useCallback(() => {
        onDonePress(activeInnerDate ? activeInnerDate.toUTCString() : "")
        if (activeInnerDate) goToDateMonth(activeInnerDate)
        else goToDateMonth(new Date())
      }, [activeInnerDate, goToDateMonth, onDonePress])

      const DayBox: FunctionComponent<{
        innerValue?: number | string
        isPrevMonth?: boolean
        isNextMonth?: boolean
        isDateActive?: (dayNumber: number) => boolean
        isDateSelected?: (dayNumber: number) => boolean
        onBoxPress?: (dayNumber: number) => void
      }> = useMemo(() => {
        return function DayBoxComponent({
          innerValue = "",
          isPrevMonth = false,
          isNextMonth = false,
          isDateActive = () => false,
          isDateSelected = () => false,
          onBoxPress = () => {},
        }) {
          const handleBoxPress: () => void = useCallback(() => {
            if (isPrevMonth || isNextMonth || typeof innerValue === "string")
              return
            onBoxPress(innerValue)
          }, [isNextMonth, isPrevMonth, onBoxPress, innerValue])

          return (
            <div
              className={`${styles.datePicker_menu_day_container} ${
                isPrevMonth || isNextMonth
                  ? styles.datePicker_menu_day_prev_container
                  : ""
              }`}
              style={
                isPrevMonth || isNextMonth || typeof innerValue === "string"
                  ? {}
                  : { cursor: "pointer" }
              }
              onClick={
                isPrevMonth || isNextMonth || typeof innerValue === "string"
                  ? () => {}
                  : handleBoxPress
              }
            >
              {isPrevMonth || isNextMonth || typeof innerValue === "string" ? (
                innerValue
              ) : (
                <div
                  className={
                    isDateSelected(innerValue)
                      ? styles.datePicker_menu_day_inner_selected
                      : isDateActive(innerValue)
                      ? styles.datePicker_menu_day_inner_active
                      : ""
                  }
                >
                  {innerValue}
                </div>
              )}
            </div>
          )
        }
      }, [])

      return (
        <div
          ref={menuRef}
          className={`${styles.datePicker_menu_container} ${
            isSelect ? styles.datePicker_menu_container_open : ""
          }`}
        >
          <section className={styles.datePicker_menu_header_flex}>
            <h4>{`${getMonthName(currentMonth)} ${currentYear}`}</h4>
            <div>
              <IconButton
                Icon={HiOutlineChevronLeft}
                onClick={handlePrevMonth}
              />
              <IconButton
                Icon={HiOutlineChevronRight}
                onClick={handleNextMonth}
              />
            </div>
          </section>

          <section>
            {[...Array(7)].map((x, index) => (
              <div key={index} className={styles.datePicker_menu_days_row}>
                {index === 0 ? (
                  [...Array(7)].map((x, idx) => (
                    <DayBox key={idx} innerValue={getWeekDayLetter(idx + 1)} />
                  ))
                ) : index === 1 ? (
                  <>
                    {getPrevMonthLastDays(firstDayOfMonth).map((day, idx) => (
                      <DayBox key={idx} innerValue={day} isPrevMonth={true} />
                    ))}
                    {[...Array(7 - (firstDayOfMonth - 1))].map((x, idx) => (
                      <DayBox
                        key={idx}
                        innerValue={idx + 1}
                        onBoxPress={handleDatePress}
                        isDateActive={compareDateToActive}
                        isDateSelected={compareDateToSelected}
                      />
                    ))}
                  </>
                ) : index < 5 ? (
                  [...Array(7)].map((x, idx) => (
                    <DayBox
                      key={idx}
                      innerValue={
                        idx + (7 * (index - 1) + 1) - (firstDayOfMonth - 1)
                      }
                      onBoxPress={handleDatePress}
                      isDateActive={compareDateToActive}
                      isDateSelected={compareDateToSelected}
                    />
                  ))
                ) : (
                  <>
                    {[...Array(7)].map((x, idx) =>
                      idx + (7 * (index - 1) + 1) - (firstDayOfMonth - 1) <=
                      daysInMonth ? (
                        <DayBox
                          key={idx}
                          innerValue={
                            idx + (7 * (index - 1) + 1) - (firstDayOfMonth - 1)
                          }
                          onBoxPress={handleDatePress}
                          isDateActive={compareDateToActive}
                          isDateSelected={compareDateToSelected}
                        />
                      ) : (
                        <DayBox
                          key={idx}
                          innerValue={
                            idx +
                            (7 * (index - 1) + 1) -
                            (firstDayOfMonth - 1) -
                            daysInMonth
                          }
                          isNextMonth={true}
                        />
                      )
                    )}
                  </>
                )}
              </div>
            ))}
          </section>

          <section className={styles.datePicker_menu_footer_flex}>
            <div>
              <Button
                className={styles.datePicker_menu_footer_cancel_button}
                onClick={handleCancelClick}
              >
                Annulla
              </Button>
            </div>

            <div>
              <Button onClick={handleDoneClick}>Fatto</Button>
            </div>
          </section>
        </div>
      )
    }
  }, [])

  return (
    <div className={styles.datePicker_container}>
      <DatePickerAnchor
        isSelect={selectMode}
        stringDate={value}
        onAnchorClick={handleAnchorClick}
        onAnchorHover={handleAnchorHover}
        onAnchorLeave={handleAnchorLeave}
      />
      <DatePickerMenu
        isSelect={selectMode}
        stringDate={value}
        activeInnerDate={activeDate}
        isClickAwayDisabled={disableClickAway}
        onDatePress={handleActiveDateChange}
        onDonePress={handleDonePress}
        onCancelPress={handleCancelPress}
      />
    </div>
  )
}

export default DatePicker
