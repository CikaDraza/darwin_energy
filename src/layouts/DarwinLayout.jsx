import { Outlet } from "react-router-dom"
import './DarwinLayouts.css'
import Header from "../components/header/Header"

export default function DarwinLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
