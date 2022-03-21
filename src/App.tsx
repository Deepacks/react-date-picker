import { useState } from "react"
import "./App.css"

import { DatePicker } from "./lib"

function App() {
  const [value, setValue] = useState<string>("")

  return (
    <div>
      <DatePicker onChange={setValue} value={value} />
    </div>
  )
}

export default App
