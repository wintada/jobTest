// import type { NextPage } from 'next'
import Layout from '../layouts/layout'

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0" style={{ padding: "20px" }}>
            <div className="flex flex-wrap justify-center">
              <div className="w-6/12 sm:w-4/12 px-4">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" alt="..." className="shadow rounded max-w-full h-auto align-middle border-none" />
              </div>
            </div>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Small Input" className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" />
            </div>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Regular Input" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" />
            </div>
            <div className="mb-3 pt-0">
              <input type="text" placeholder="Large Input" className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
