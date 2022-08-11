import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return <>
    <RecoilRoot>
      <Layout>
        <Component className="overflow-hidden" {...pageProps} />
      </Layout>
    </RecoilRoot>
  </>
}

export default MyApp