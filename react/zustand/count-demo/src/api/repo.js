import axios from "axios"

export const getRepo = async (username, repo) => {
    return await axios.get(`/repos/${username}/${repo}`)
}

export const getRepoList = async (username) => {
    return await axios.get(`/users/${username}/repos`)
}