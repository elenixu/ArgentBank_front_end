import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import store from '../src/redux/store'
import { Provider } from 'react-redux'

import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Signin from './pages/Signin'
import User from './pages/User'

const root = document.getElementById('root')
const rootElement = createRoot(root)

console.log('store is : ' + store)

console.dir(store)

rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/User" element={<User />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
)
