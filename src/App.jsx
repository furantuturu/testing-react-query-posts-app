import { useState } from 'react'
import PostList from './PostList'
import CreatePost from './CreatePost'

export default function App() {
  const [currentPost, setCurrentPost] = useState(<PostList id={ 1 } />)

  return (
    <>
      <div className='container'>
        <button onClick={ () => setCurrentPost(<PostList id={ 1 } />) }>Post 1</button>
        <button onClick={ () => setCurrentPost(<PostList id={ 2 } />) }>Post 2</button>
        <button onClick={ () => setCurrentPost(<PostList id={ 3 } />) }>Post 3</button>
        <button 
          onClick={ () => setCurrentPost(<CreatePost setCurrentPost={ setCurrentPost } />) }
          >
            Create Post
        </button>
        { currentPost }
      </div>
    </>
  )
}