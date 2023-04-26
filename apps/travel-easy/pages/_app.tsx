import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Head>
        <title>Weather Forecast for Easy Travel</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </LocalizationProvider>
  );
}

export default CustomApp;
