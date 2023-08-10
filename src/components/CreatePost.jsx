import { useState, useEffect } from 'react'
import { doc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const submitData = async () => {
    const docRef = doc(collection(db, 'posts')); // コレクションのみを指定
    await setDoc(docRef, {
      title: title,
      content: content,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      }
    });
    navigate('/');
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white flex flex-col rounded-md w-96 h-120 gap-8 p-8 shadow-2xl'>
        <h1 className='text-3xl font-bold font-mono'>記事投稿</h1>
        <div>
          <div className='font-bold'>タイトル</div>
          <input
            type="text"
            className='w-full h-12 outline pb-5 mt-2'
            placeholder='タイトルを記入'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div className='font-bold'>詳細</div>
          <textarea
            name="content"
            className='w-full h-36 outline mt-2'
            placeholder='詳細を記入'
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          className='text-white bg-blue-500 shadow-lg shadow-blue-500/50 rounded-md py-2 cursor-pointer hover:bg-blue-600 hover:shadow-md transition duration-300 ease-in-out'
          onClick={submitData}>
          投稿する
        </button>
      </div>
    </div>
  )
}

export default CreatePost
