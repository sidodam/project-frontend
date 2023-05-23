// @ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { AuthContextProvider } from '../componenets/AuthContext'


function MyApp({ Component, pageProps }: AppProps) {


  return (

    <>
      <AuthContextProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </AuthContextProvider>
    </>

  )

}

export default MyApp
