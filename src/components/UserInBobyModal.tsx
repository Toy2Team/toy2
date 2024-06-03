import { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import { userInBodyModalProps } from '@/lib/types/userInformation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import {
  LabelBox,
  ModalBackgroundBox,
  UserInformationModalBox,
  UserInformationModalBtnBox,
  UserModalInformationH2,
} from '@/styles/userInformation';

const UserInBodyModal = ({ isOpen, onClose, setUserBodyData }: userInBodyModalProps) => {
  const [muscleMass, setMuscleMass] = useState<string>('');
  const [bmi, setBmi] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  const loadData = async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}/body`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      setMuscleMass(data.muscleMass || '');
      setBmi(data.bmi || '');
      setHeight(data.height || '');
      setWeight(data.weight || '');
    }
  };

  const handleSave = async () => {
    try {
      if (isNaN(Number(muscleMass)) || isNaN(Number(bmi)) || isNaN(Number(height)) || isNaN(Number(weight))) {
        alert('숫자만 입력해주세요.');
        return;
      }
      if (!muscleMass) {
        alert('근육량을 입력해주세요.');
        return;
      }
      if (!bmi) {
        alert('BMI를 입력해주세요.');
        return;
      }
      if (!height) {
        alert('키를 입력해주세요.');
        return;
      }
      if (!weight) {
        alert('체중을 입력해주세요.');
        return;
      }

      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}/body`);
      await set(userRef, {
        muscleMass,
        bmi,
        height,
        weight,
      });

      setUserBodyData({ muscleMass, bmi, height, weight });
      onClose();
    } catch (error) {
      console.error(error, '저장하는데 실패했습니다.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <ModalBackgroundBox isOpen={isOpen} onClose={onClose} onClick={onClose} />}
      <UserInformationModalBox isOpen={isOpen} onClose={onClose}>
        <UserModalInformationH2>신체정보 수정</UserModalInformationH2>
        <LabelBox>
          <label>
            키 (cm):
            <Input type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="cm" />
          </label>
          <label>
            체중 (kg):
            <Input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="kg" />
          </label>
          <label>
            BMI (kg/㎡):
            <Input type="text" value={bmi} onChange={(e) => setBmi(e.target.value)} placeholder="kg/㎡" />
          </label>
          <label>
            근육량 (kg):
            <Input type="text" value={muscleMass} onChange={(e) => setMuscleMass(e.target.value)} placeholder="kg" />
          </label>
        </LabelBox>
        <UserInformationModalBtnBox>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={onClose}>취소</Button>
        </UserInformationModalBtnBox>
      </UserInformationModalBox>
    </>
  );
};

export default UserInBodyModal;
