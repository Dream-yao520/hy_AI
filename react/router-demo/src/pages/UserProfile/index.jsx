import {
    useEffect
} from 'react'
import { useParams } from 'react-router-dom'


const UserProfile = () => {
    const { id } = useParams()
    useEffect(() => {
        // const id =  window.location.href.split('/')[4]
    }, [])
    return (
        <>
            UserProfile {id}
        </>
    )
}

export default UserProfile
