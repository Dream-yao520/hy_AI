import {
    useState
} from 'react'

export default function Home() {
    const [count, setCount] = useState(0)

    return (
        <>
            Home Page
            <p>计数:{count}</p>
            <button onClick={() => setCount(c => c + 1)}>加一</button>
            <KeepAlive active={count > 0}>
                <div>
                    <h1>Home</h1>
                </div>
            </KeepAlive>
        </>
    )
}
