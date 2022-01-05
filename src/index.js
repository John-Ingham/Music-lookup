import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Lyrics from './components/Lyrics'
import Header from './components/Header'
import Songs from './components/Songs'

const rootElement = document.getElementById('root')

render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="songs" element={<Songs />} />
      <Route path="lyrics" element={<Lyrics />} />
    </Routes>
  </BrowserRouter>,

  rootElement,
)
