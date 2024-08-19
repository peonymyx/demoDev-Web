import React from 'react'
import HomePage from './Home/HomePage'
import RouterCom from './Home/RouterCom'
import {Routes, Route  } from 'react-router-dom'
const App:React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/new" element={<RouterCom/>}/>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default App