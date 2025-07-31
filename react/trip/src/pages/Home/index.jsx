import useTitle from '@/hooks/useTitle'
import { useState } from 'react';
import { Search, Button } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/components/Toast/toastController';

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
            <Button
                type="primary"
                onClick={() => showToast({
                    user: 1,
                    bell: 2,
                    mail: 3
                })}>showToast
            </Button>
        </>
    )
}

export default Home