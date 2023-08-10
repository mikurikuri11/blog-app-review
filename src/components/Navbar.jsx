import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faFilePen, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  const toggleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
      });
  };

  const toggleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        navigate('/');
      });
  };

  return (
    <nav className='flex justify-center items-center h-24 bg-gray-400 gap-10'>
      <Link to="/" className='text-sky-200 hover:text-sky-400'>
        <FontAwesomeIcon icon={faHouseChimney} className='pr-1' />
        ホーム
      </Link>
      {isAuth ? (
        <>
          <Link to="/createpost" className='text-sky-200 hover:text-sky-400'>
            <FontAwesomeIcon icon={faFilePen} className='pr-1' />
            記事投稿
          </Link>
          <button className='text-sky-200 hover:text-sky-400' onClick={toggleSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} className='pr-1' />
            ログアウト
          </button>
        </>
      ) : (
        <button className='text-sky-200 hover:text-sky-400' onClick={toggleSignIn}>
          <FontAwesomeIcon icon={faRightToBracket} className='pr-1' />
          ログイン
        </button>
      )}
    </nav>
  );
};

export default Navbar;
