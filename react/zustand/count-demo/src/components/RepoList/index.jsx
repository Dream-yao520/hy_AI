import { useReposStore } from '../../store/repos'
import { useEffect } from 'react'


const RepoList = () => {
    const {
        repos,
        loading,
        error,
        fetchRepos
    } = useReposStore()
    // console.log(useReposStore());

    useEffect(() => {
        fetchRepos()
    }, [])
    if (loading) {
        return <p>loading...</p>
    }
    if (error) {
        return <p>error</p>
    }
    return (
        <>
            <h1>RepoList</h1>
            <ul>
                {
                    repos.map((repo) => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                            <p>{repo.description || 'No description'}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default RepoList
