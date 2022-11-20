import "../styles/globals.css";
import "styles/icons/css/all.css";
import type { AppProps } from "next/app";
// import { Provider } from "react-redux";
import { storeWrapper } from "../redux/store";
import StateSetup from "../components/general/Statesetup";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
      <StateSetup>
        <Component {...pageProps} />
      </StateSetup>
    // </Provider>
  );
}

export default storeWrapper.withRedux(MyApp);
;
