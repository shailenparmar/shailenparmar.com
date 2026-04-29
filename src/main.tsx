import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout'
import Home from './pages/Home'
import Art from './pages/Art'
import Design from './pages/Design'
import Experience from './pages/Experience'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="art" element={<Art />} />
          <Route path="design" element={<Design />} />
          <Route path="experience" element={<Experience />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
