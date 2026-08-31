import { Outlet } from "react-router";
import Homepage from "./components/Homepage/Homepage";
import './App.css'

function App() {
  return (
    <>
      <Homepage/>
      <Outlet/>
    </>
  )
}

export default App
