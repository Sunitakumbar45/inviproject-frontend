
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/AuthProvider.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <AuthProvider>
    <Provider store={store}>
    
    <App/>
    
    </Provider>
  </AuthProvider>
 
  
  </BrowserRouter>
)


