import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { createPost } from './api/posts'
import PostList from './PostList'

export default function CreatePost({ setCurrentPost }) {
    const queryClient = useQueryClient()

    const titleRef = useRef()
    const bodyRef = useRef()

    const createPostMutation = useMutation({
        mutationFn: createPost,
        //* equivalent to 
        /* 
        mutationFn: (variables) => {
            createPost(variables) - variables as the one u pass in to mutate function
        } 
        */
        // onSuccess: (data, variables, context) - context here means that you can save and store all your different mutates, the return value of onMutate method will be the context
        // onError: (error, variables, context)
        // onSettled: (data, error, variables, context) - this kinda like finally in try catch
        // onMutate: (variables) - this going to be called before your mutation func and this is where you set your context
        // retry: 3 - this means retry 3 times before error
        onSuccess: data => {
            //* eveytime it goes to the new post, it reloads and it affect load times
            //* reason is you dont have that post in your cache, it only happens after finish mutation
            //* solution: you can manually updata the cache
            queryClient.setQueryData(["posts", Math.trunc(data.id / 10)], data)

            queryClient.invalidateQueries(["posts"]) // * invalidate any queries that has "posts" as key

            setCurrentPost(<PostList id={ Math.trunc(data.id / 10) } />) 
            //? since the api is not really updating as is but faked
            //? its still an acceptable request but the id value of it will be 101
            //? so ill divide it by 10 to make the post with an id = 10 show up instead
        }

    })

    // createPostMutation.data - if api returns some kind of data will be assigned here
    // createPostMutation.mutateAsync().then()

    function handleSubmit(e) {
        e.preventDefault()
        createPostMutation.mutate({
            title: titleRef.current.value,
            body: bodyRef.current.value
        })
    }

    return (
        <>
            { createPostMutation.isError && JSON.stringify(createPostMutation.error) }
            <h1>Create Post</h1>
            <hr />
            <form onSubmit={ handleSubmit }>
                Title: <input type="text" ref={ titleRef } />
                <br />
                Body: 
                <br />
                <textarea cols="30" rows="10" ref={ bodyRef }></textarea>
                <br />
                <button type="submit">Create</button>
            </form>
        </>
    )
}
