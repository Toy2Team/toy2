import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, set, get } from 'firebase/database';
import { auth, db, storage } from '@/firebase';
import Button from '@/components/Button';
import { userInfoModalProps } from '@/lib/types/userModalProps';
import { UserModalBtnBoxProps } from '@/lib/types/userInfoModalType';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

const UserInfoModal = ({ isOpen, onClose, setUserInfoData }: userInfoModalProps) => {
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const loadData = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setEmail(data.email || '');
      setBirthday(data.birthday || '');
      setPhoneNumber(data.phoneNumber || '');
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}`);
    let photoURL = '';

    if (file) {
      const fileRef = storageRef(storage, `/${userId}/${file.name}`);
      await uploadBytes(fileRef, file);
      photoURL = await getDownloadURL(fileRef);
    }

    await set(userRef, {
      email,
      birthday,
      phoneNumber,
      photoURL,
    });

    setUserInfoData({ email, birthday, phoneNumber, photoURL });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <ModalBackground isOpen={isOpen} onClose={onClose} onClick={onClose} />}
      <UserInfoModalBox isOpen={isOpen} onClose={onClose}>
        <h2>개인정보 수정</h2>
        <label>
          <input type="file" onChange={handleFileChange} />
        </label>
        <label>
          이메일:
          <UserInfoInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
        </label>
        <label>
          생년월일:
          <UserInfoInput type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>
        <label>
          전화번호:
          <UserInfoInput
            type="tel"
            pattern="[0-9]{11}"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <UserInfoModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInfoModalBtnBox>
      </UserInfoModalBox>
    </>
  );
};

export default UserInfoModal;

const UserInfoModalBox = styled.div<UserModalBtnBoxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ModalBackground = styled.div<UserModalBtnBoxProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const UserInfoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const UserInfoModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;
