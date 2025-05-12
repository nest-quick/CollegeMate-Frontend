import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./pages/HomePage"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
