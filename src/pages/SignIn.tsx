import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import bgLogin from '@/assets/images/bg-login.png';
import { BgLoginImg, LogoImg, SignForm, SignSection } from '@/styles/signStyle';
import logo from '@/assets/images/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const routeChange = () => {
    navigate('/signup');
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력하세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인에 성공하였습니다.');
      navigate('/calendar');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('존재하지 않는 사용자입니다.');
            break;
          case 'auth/wrong-password':
            setError('비밀번호가 올바르지 않습니다.');
            break;
          case 'auth/invalid-email':
            setError('유효하지 않은 이메일 주소입니다.');
            break;
          default:
            setError('로그인에 실패하였습니다. 다시 시도해주세요.');
            break;
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <BgLoginImg src={bgLogin} alt="회원가입 화면 이미지" />
      <SignForm onSubmit={handleSignIn}>
        <SignSection>
          <LogoImg src={logo} alt="로고 이미지" />
          <h2>로그인</h2>
          <label htmlFor="email">
            이메일(아이디)
            <input
              type="email"
              placeholder="이메일(아이디)을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">로그인</button>
          <button type="button" onClick={routeChange}>
            회원가입
          </button>
          {error && <p>{error}</p>}
        </SignSection>
      </SignForm>
    </>
  );
};

export default SignIn;