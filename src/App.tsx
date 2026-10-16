import { useState } from "react"
import { HangszerTabla } from "./components/HangszerTabla"
import { hangszerek } from "./data"

function App() {
  const [kereses, setKereses] = useState("")

  const szurtHangszerek = hangszerek.filter((item) =>
    item.nev.toLowerCase().includes(kereses.toLowerCase().trim())
  )

  return (
    <>
      <h1>Hangszerek</h1>
      <input
        type="text"
        value={kereses}
        onChange={(e) => setKereses(e.target.value)}
      />
      <HangszerTabla data={szurtHangszerek}></HangszerTabla>
    </>
  )
}

export default App
