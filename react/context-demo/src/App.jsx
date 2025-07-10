import { useState } from 'react'
import './App.css'
import Page from './components/Page'
import { ThemeContext } from './ThemeContext'

function App() {
  console.log(ThemeContext)
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <Page />
      <button onClick={() => setTheme('dark')}>切换主题</button>
      {/* <Uncle /> */}
      {/* <Parent>
        <Child>
          <GrandChild>
            <GreatFrandChild></GreatFrandChild>
          </GrandChild>
        </Child>
      </Parent> */}

    </ThemeContext.Provider>
  )
}

export default App
