import { useRef, useState } from "react"

export const useBuildCalendar: () => {
  daysInMonth: number
  firstDayOfMonth: number
  currentMonth: number
  currentYear: number
  getPrevMonthLastDays: (offset: number) => number[]
  getNextMonth: () => void
  getPrevMonth: () => void
  goToDateMonth: (date: Date) => void
  getWeekDayLetter: (weekDay: number) => string
  getMonthName: (monthNumber: number) => string
} = () => {
  const today = new Date()
  const thisMonth = useRef<number>(today.getMonth() + 1)
  const thisYear = useRef<number>(today.getFullYear())

  const [daysInMonth, setDaysInMonth] = useState<number>(
    new Date(thisYear.current, thisMonth.current, 0).getDate()
  )
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(
    new Date(thisYear.current + "-" + thisMonth.current + "-01").getDay() === 0
      ? 7
      : new Date(thisYear.current + "-" + thisMonth.current + "-01").getDay()
  )

  const getPrevMonthLastDays: (offset: number) => number[] = (offset) => {
    if (offset === 0) return []
    const daysInPrevMonth = new Date(
      thisMonth.current === 1 ? thisYear.current - 1 : thisYear.current,
      thisMonth.current === 1 ? 12 : thisMonth.current - 1,
      0
    ).getDate()
    return [...Array(offset - 1)]
      .map((x, idx) => daysInPrevMonth - idx)
      .reverse()
  }

  const getNextMonth: () => void = () => {
    const nextMonth = thisMonth.current === 12 ? 1 : thisMonth.current + 1
    const nextYear =
      thisMonth.current === 12 ? thisYear.current + 1 : thisYear.current

    setDaysInMonth(new Date(nextYear, nextMonth, 0).getDate())
    const firstDay = new Date(nextYear + "-" + nextMonth + "-01").getDay()
    setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay)

    thisMonth.current = nextMonth
    thisYear.current = nextYear
  }

  const getPrevMonth: () => void = () => {
    const prevMonth = thisMonth.current === 1 ? 12 : thisMonth.current - 1
    const prevYear =
      thisMonth.current === 1 ? thisYear.current - 1 : thisYear.current

    setDaysInMonth(new Date(prevYear, prevMonth, 0).getDate())
    const firstDay = new Date(prevYear + "-" + prevMonth + "-01").getDay()
    setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay)

    thisMonth.current = prevMonth
    thisYear.current = prevYear
  }

  const goToDateMonth: (date: Date) => void = (date) => {
    const goToMonth = date.getMonth() + 1
    const goToYear = date.getFullYear()

    setDaysInMonth(new Date(goToYear, goToMonth, 0).getDate())
    const firstDay = new Date(goToYear + "-" + goToMonth + "-01").getDay()
    setFirstDayOfMonth(firstDay === 0 ? 7 : firstDay)

    thisMonth.current = goToMonth
    thisYear.current = goToYear
  }

  const getWeekDayLetter: (weekDay: number) => string = (weekDay) => {
    switch (weekDay) {
      case 1:
        return "L"
      case 2:
        return "M"
      case 3:
        return "M"
      case 4:
        return "G"
      case 5:
        return "V"
      case 6:
        return "S"
      case 7:
        return "D"

      default:
        return ""
    }
  }

  const getMonthName: (monthNumber: number) => string = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "Gennaio"
      case 2:
        return "Febbraio"
      case 3:
        return "Marzo"
      case 4:
        return "Aprile"
      case 5:
        return "Maggio"
      case 6:
        return "Giugno"
      case 7:
        return "Luglio"
      case 8:
        return "Agosto"
      case 9:
        return "Settembre"
      case 10:
        return "Ottobre"
      case 11:
        return "Novembre"
      case 12:
        return "Dicembre"

      default:
        return ""
    }
  }

  return {
    daysInMonth,
    firstDayOfMonth,
    currentMonth: thisMonth.current,
    currentYear: thisYear.current,
    getPrevMonthLastDays,
    getNextMonth,
    getPrevMonth,
    goToDateMonth,
    getWeekDayLetter,
    getMonthName,
  }
}
