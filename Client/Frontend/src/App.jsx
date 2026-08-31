import { Link, Outlet } from "react-router";
import './App.css'

function App() {
  return (
    <>
      <h1>Where's Wally?</h1>
      <h2>Find all these characters, as fast as you can</h2>
      <div>

      </div>
      <Link>Start Game</Link>
      <Outlet/>
    </>
  )
}

export default App
