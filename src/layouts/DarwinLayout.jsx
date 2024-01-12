import { Outlet } from "react-router-dom"
import './DarwinLayouts.scss'
import Header from "../components/header/Header"

export default function DarwinLayout() {
  return (
    <div className="darwin-layout">
      <div className="wrapper"></div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
