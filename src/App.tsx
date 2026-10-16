import { HangszerTabla } from "./components/HangszerTabla"
import { hangszerek } from "./data"

function App() {
  return (
    <>
      <h1>Hangszerek</h1>
      <HangszerTabla data={hangszerek}></HangszerTabla>
    </>
  )
}

export default App
