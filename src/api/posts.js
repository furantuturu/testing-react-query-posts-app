export default function getPosts(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
}