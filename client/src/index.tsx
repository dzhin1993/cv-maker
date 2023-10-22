import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'react-datepicker/dist/react-datepicker.css'
import {GoogleOAuthProvider} from '@react-oauth/google'

import App from './App'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </GoogleOAuthProvider>
    </Provider>
)
