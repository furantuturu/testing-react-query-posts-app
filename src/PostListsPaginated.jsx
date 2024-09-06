import { useQuery } from '@tanstack/react-query' 
import { useState } from 'react'
import { getPostPaginated } from './api/posts'

export default function PostListsPaginated() {
    const [page, setPage] = useState(1)

    const posts = useQuery({
        queryKey: ["posts", { page }],
        keepPreviousData: true,
        queryFn: () => getPostPaginated(page)
    })

    if (posts.isLoading) return <h1>Loading...</h1>
    if (posts.isError) return <h1>{ JSON.stringify(error) }</h1>

    return (
        <>
            <h1>Post List Paginated</h1>
            <hr />
            <ol>
                { posts.data.posts.map(post => {
                    return <li value={ post.id } key={ post.id } style={{ margin: .3 + 'rem' }} >{ post.title }</li>
                }) }
            </ol>

            { posts.data.prevPage && (
                <button onClick={ () => setPage(posts.data.prevPage) } >Prev</button>
            )}
            { " " }
            { posts.data.nextPage && (
                <button onClick={ () => setPage(posts.data.nextPage) } >Next</button>
            )}
        </>
    )
}