import { useState } from "react"
import { HangszerTabla } from "./components/HangszerTabla"
import { hangszerek } from "./data"

function App() {
  const [kereses, setKereses] = useState("")
  const [sorrend, setSorrend] = useState<"novekvo" | "csokkeno">("novekvo")

  const szurtHangszerek = hangszerek.filter((item) =>
    item.nev.toLowerCase().includes(kereses.toLowerCase().trim())
  ).toSorted((a, b) => (a.ar - b.ar) * (sorrend == "csokkeno" ? -1 : 1))

  return (
    <>
      <h1>Hangszerek</h1>
      <input
        type="text"
        value={kereses}
        onChange={(e) => setKereses(e.target.value)}
      />
      <HangszerTabla data={szurtHangszerek}></HangszerTabla>

      <button onClick={(e) => setSorrend("novekvo")}>Növ</button>
      <button onClick={(e) => setSorrend("csokkeno")}>Csök</button>
    </>
  )
}

export default App
