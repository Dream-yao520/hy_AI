import { useState, useRef } from 'react'
import './App.css'

function App() {
  //火山引擎tts 配置文件
  const TOKEN = ''
  const APP_ID = ''
  const CLUSTER_ID = ''

  //代码可读性高于一切
  const [prompt, setPrompt] = useState('大家好,我是黄新天')
  //react use 开头 ref hook  可以获取dom元素
  const audioPlayer = useRef(null)
  console.log(audioPlayer, '////')

  const [count, setCount] = useState(0)
  const playMusic = () => {
    // console.log(audioPlayer, '+++');

    console.log('playMusic')
    audioPlayer.current.play()
  }
  const generateAudio = () => {
    //女性
    // const voiceName = 'zh_female_shuangkuaisisi_moon_bigtts'
    const voiceName = 'zh_male_sunwukong_mars_bigtts'
    const endpoint = '/tts/api/v1/tts'//tts api llm 服务地址
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer;${TOKEN}`
    }
  }
  return (
    <div className='container'>
      <div>
        <label>Prompt</label>
        <button onClick={generateAudio}>生成并播放</button>
        <textarea classname='input' value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
      </div>
      <audio ref={audioPlayer} src="/sounds/snare.wav"></audio>
      {/* <button onClick={playMusic}>播放</button> */}
    </div>
  )
}

export default App
