import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return <>
    <Layout>
      <Component className="overflow-hidden" {...pageProps} />
    </Layout>
  </>
}

export default MyApp