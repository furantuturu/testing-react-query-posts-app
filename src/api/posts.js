export function getPost(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
}

export function createPost({ title, body }) {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            userId: 1,
            title,
            body
        })
    })
    .then(res => res.json())
}