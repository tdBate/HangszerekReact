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
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="text-center">Hangszerek</h1>

            <label className="form-label" htmlFor="filterName">Filter: </label><input
              className="form-control"
              name="filterName"
              type="text"
              value={kereses}
              onChange={(e) => setKereses(e.target.value)}
            />
            <HangszerTabla data={szurtHangszerek}></HangszerTabla>

            <button className="btn btn-primary" onClick={(e) => setSorrend("novekvo")}>Növ</button>
            <button className="btn btn-primary" onClick={(e) => setSorrend("csokkeno")}>Csök</button>

            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="nev">Név: </label><input className="form-control" name="nev" id="nev" type="text" /><br />
              <label className="form-label" htmlFor="ar">Ár: </label><input className="form-control" name="ar" id="ar" type="number" />

              <button className="btn btn-primary" type="submit">Elküld</button>
            </form>

            <div className="text-danger" id="hibaBlokk">
              {hiba}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
