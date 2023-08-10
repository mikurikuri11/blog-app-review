import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, 'posts'));
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, [])

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    // window.location.reload();
    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center p-10">
      {posts.map(post => (
        <div key={post.id} className="w-96 h-auto bg-white shadow-2xl m-3 p-10 rounded-md">
          <div>
            <h1 className="font-bold text-3xl text-center my-2">{post.title}</h1>
          </div>
          <div>
            <div className="h-auto break-words w-full max-h-96">{post.content}</div>
            <div className="flex items-center justify-between">
              <h3 className="flex-auto">@{post.author.username}</h3>
              {auth.currentUser && post.author.id === auth.currentUser.uid && (
                <button
                  className="w-1 flex-auto bg-red-400 text-white shadow-lg shadow-red-500/50 py-2 px-1 rounded-md cursor-pointer hover:shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                  onClick={() => deletePost(post.id)}>
                    削除
                </button>
              )
              }
            </div>
          </div>
        </div>
      ))}
  </div>
  )
}

export default Home