import useTitle from '@/hooks/useTitle'
import { useState } from 'react';
import { Search } from 'react-vant';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    useTitle('奶龙首页')
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/search')
    }
    return (
        <>
            <h1>Home</h1>
            <div onClick={handleClick}>
                <Search
                    value={value}
                    onChange={setValue}
                    clearable placeholder="请输入搜索关键词"
                />
            </div>

        </>
    )
}

export default Home