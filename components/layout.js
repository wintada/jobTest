import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="grow-0">
        <Navbar/>
      </div>
      <div className="flex grow h-screen bg-sky-500">
        <Sidebar/>
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  )
}