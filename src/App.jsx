import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './components/Home'
import Navbar from './components/Navbar'
import CreatePost from './components/CreatePost'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') || false);

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
      </Routes>
    </Router>
  )
}

export default App
