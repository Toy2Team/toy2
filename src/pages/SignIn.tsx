import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import bgLogin from '@/assets/images/bg-login.png';
import { BgLoginImg, LogoImg, SignForm, SignSection, SignLabel, BorderBox } from '@/styles/commonSignStyle';
import logo from '@/assets/images/logo.png';
import Button from '@/components/Button';
import { get, ref, set } from 'firebase/database';
import FormInput from '@/components/FormInput';
import styled from 'styled-components';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [userInfoData, setUserInfoData] = useState<any>({}); // userInfo 상태 선언

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

    if (password.length < 8) {
      setPasswordError('비밀번호를 8자 이상 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userRef = ref(db, 'users/' + auth.currentUser?.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        console.log(snapshot.val());
        // 로그인 성공 후 데이터를 상태에 저장
        setUserInfoData(snapshot.val());
      } else {
        console.log('No data available');
      }
      alert('로그인에 성공하였습니다.');
      navigate('/calendar');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            setError('이메일 형식이 틀립니다.');
            break;
          case 'auth/user-not-found':
            setError('회원가입이 되어있지 않은 사용자입니다.');
            break;
          case 'auth/wrong-password':
            setError('비밀번호가 올바르지 않습니다.');
            break;
          case 'auth/invalid-credential':
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
            break;
          default:
            break;
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserInfoData({
              email: data.email || '',
              userName: data.userName || '',
              birthday: data.birthday || '',
              phoneNumber: data.phoneNumber || '',
              photoURL: data.photoURL || '',
            });
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <BgLoginImg src={bgLogin} alt="회원가입 화면 이미지" />
      <SignForm onSubmit={handleSignIn}>
        <SignSection>
          <LogoImg src={logo} alt="로고 이미지" />
          <h2>로그인</h2>
          <SignLabel htmlFor="email">
            이메일(아이디)
            <FormInput
              type="email"
              placeholder="이메일(아이디)을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </SignLabel>
          <SignLabel htmlFor="password">
            비밀번호
            <FormInput
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              required={true}
            />
          </SignLabel>
          <ButtonCompoent type="submit">로그인</ButtonCompoent>
          {passwordError && <p>{passwordError}</p>}
          {error && <p>{error}</p>}
          <BorderBox />
          <SignUpQuestionBox>
            <span>아직 계정이 없으신가요? </span>
            <SignUpBtn type="button" onClick={routeChange}>
              회원가입하기
            </SignUpBtn>
          </SignUpQuestionBox>
        </SignSection>
      </SignForm>
    </>
  );
};

export default SignIn;

const ButtonCompoent = styled(Button)`
  width: 70%;
`;

const SignUpQuestionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SignUpBtn = styled.button`
  color: var(--color-primary);
`;
