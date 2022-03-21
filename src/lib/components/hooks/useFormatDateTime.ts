import { useEffect, useState } from "react"

export const useFormatDateTime: (utcDateString: string | undefined) => {
  date: string
  time: string
} = (utcDateString) => {
  const [dateObj, setDateObj] = useState<Date>()

  useEffect(() => {
    if (!utcDateString) return
    setDateObj(new Date(utcDateString))
  }, [utcDateString])

  const formatTimeString: (value: number) => string = (value) => {
    if (value.toString().length === 1) return "0" + value
    else return value.toString()
  }
  return {
    date: dateObj
      ? `${formatTimeString(dateObj.getDate())}/${dateObj.getMonth() + 1}`
      : "",
    time: dateObj
      ? `${formatTimeString(dateObj.getHours())}:${formatTimeString(
          dateObj.getMinutes()
        )}`
      : "",
  }
}
