import type { ReactElement } from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app.js'
import { Alert } from "@material-tailwind/react";

const Page: NextPageWithLayout = () => {
  return <>
    <div className="w-full h-full p-5 bg-gray-50">
      <div>
        <Alert className="bg-gray-400 text-gray-800">Tables</Alert>
      </div>
    </div>
  </>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{ page }</Layout>
  )
}

export default Page