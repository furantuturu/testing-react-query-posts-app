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

export function getPostPaginated(page) {
    return fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => {
                let displayDataCount = page * 10
                let start = displayDataCount - 10
                let end = displayDataCount

                return {
                    posts: data.slice(start, end),
                    prevPage: page > 1 ? page - 1 : undefined,
                    nextPage: page < (data.length / 10) ? page + 1 : undefined,
                }
            })
}