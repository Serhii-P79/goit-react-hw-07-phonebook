import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { App } from 'сomponents';
import { theme } from 'constants';
import { store } from 'redux/store';
import { Provider } from 'react-redux';

//import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
