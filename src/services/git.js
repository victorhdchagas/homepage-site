/* eslint-disable */
import axios from 'axios'
const fields = ['name', 'language', 'open_issues', 'updated_at', 'created_at', 'html_url', 'size', 'id', 'pushed_at', 'stargazers_count', 'homepage', 'description']
export default {
    getRepository: () => {
        return axios.get('https://api.github.com/users/victorhdchagas/repos').then(obj => {
            return obj.data.map(repo => {
                let toReturn = {}
                for (let f of fields) {
                    toReturn[f] = repo[f]
                }
                return toReturn
            })
        })
    },
    formatGit: (repo) => {
        // let randomIndex = Math.floor(Math.random() * arr.length)
        // let repo = arr[randomIndex]
        // let newRepo = {}
        // for (let f of fields) {
        //     newRepo[f] = repo[f]
        // }
        return JSON.stringify(repo).split(',').join('\n').replace('{', '').replace('}', '')
    },
    selectRandomRepo: (arr) => {
        let randomIndex = Math.floor(Math.random() * arr.length)
        return arr[randomIndex]
    }
}