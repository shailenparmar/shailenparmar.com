import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout'
import Home from './pages/Home'
import Art from './pages/Art'
import Design from './pages/Design'
import Neuralink from './pages/Neuralink'
import Experience from './pages/Experience'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="art" element={<Art />} />
          <Route path="projects" element={<Design />} />
          <Route path="design" element={<Neuralink />} />
          <Route path="connect" element={<Experience />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
