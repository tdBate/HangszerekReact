import { useState, type FormEvent } from "react"
import { HangszerTabla } from "./components/HangszerTabla"
import { hangszerek } from "./data"

function App() {
  const [kereses, setKereses] = useState("")
  const [sorrend, setSorrend] = useState<"novekvo" | "csokkeno">("novekvo")

  const [data, setData] = useState(hangszerek)

  const [hiba, setHiba] = useState("");

  function addItem(nev: string, ar: number) {
    setData([...data, { nev, ar }]);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nev = formData.get("nev");
    const ar: number = Number(formData.get("ar"));

    if (!nev || !ar) {
      setHiba("Mindkét mezőt ki kell tölteni");
      return;
    }

    if (ar < 0) {
      setHiba("Nem valid szám");
      return;
    }

    addItem(nev, ar);
    form.reset();
    setHiba("");
  }


  const szurtHangszerek = data.filter((item) =>
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

      <form onSubmit={handleSubmit}>
        <label htmlFor="nev">Név: </label><input name="nev" id="nev" type="text" /><br />
        <label htmlFor="ar">Ár: </label><input name="ar" id="ar" type="number" />

        <button type="submit">Elküld</button>
      </form>

      <div id="hibaBlokk">
        {hiba}
      </div>
    </>
  )
}

export default App
