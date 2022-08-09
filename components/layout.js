import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="grow-0">
        <Navbar/>
      </div>
      <div className="flex grow h-screen">
        <Sidebar/>
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  )
}