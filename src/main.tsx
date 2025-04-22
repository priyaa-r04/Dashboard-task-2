import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './Components/ContextAPI/UserContext.tsx'
import {Provider} from 'react-redux'
import { store } from './Store/Store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
    </Provider>
  </StrictMode>,
)
