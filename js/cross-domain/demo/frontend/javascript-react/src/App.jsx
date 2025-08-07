import { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // (async () => {
    //   // 前后端联调
    //   const res = await fetch('http://localhost:8080/api/hello')
    //   const data = await res.json()
    //   console.log(data)
    // })()
  }, [])

  return (
    <>
      <img src="https://ts1.tc.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0" alt="" style={{ width: '500px' }} />
    </>
  )
}

export default App
