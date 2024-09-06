import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getPost } from './api/posts'
import PostList from './PostList'
import CreatePost from './CreatePost'
import PostListsPaginated from './PostListsPaginated'

export default function App() {
  const [currentPost, setCurrentPost] = useState(<PostList id={ 1 } />)
  const queryClient = useQueryClient()

  function onHoverPostTwoLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 2],
      queryFn: () => getPost(2)
    })

  }

  return (
    <>
      <div className='container'>
        <button onClick={ () => setCurrentPost(<PostList id={ 1 } />) }>Post 1</button>

        <button 
          onMouseEnter={ () => onHoverPostTwoLink() } 
          onClick={ () => setCurrentPost(<PostList id={ 2 } />) }
          >
            Post 2
        </button>

        <button onClick={ () => setCurrentPost(<PostList id={ 3 } />) }>Post 3</button>

        <button 
          onClick={ () => setCurrentPost(<CreatePost setCurrentPost={ setCurrentPost } />) }
          >
            Create Post
        </button>
        
        <button onClick={ () => setCurrentPost(<PostListsPaginated />) }>Post Lists Paginated</button>

        { currentPost }
      </div>
    </>
  )
}