import { useQuery } from '@tanstack/react-query'
import { getPost } from './api/posts'

export default function PostList({ id }) {
    const post = useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPost(id)
    })

    if (post.isLoading) return <h1>Loading...</h1>
    if (post.isError) return <h1>{ JSON.stringify(post.error) }</h1>

    return (
        <>
            <div>
                <h1>{ post.data.title.charAt(0).toUpperCase() + post.data.title.slice(1) }</h1>
                <h4><i>~by User# { post.data.userId }</i></h4>
                <p>{ post.data.body.charAt(0).toUpperCase() + post.data.body.slice(1) }</p>
            </div>
        </>
    )

}