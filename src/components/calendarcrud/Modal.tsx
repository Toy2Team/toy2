import { useRef, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';
import { useRecoilState } from 'recoil';
import {
  firstInputState,
  secondInputState,
  memoInputState,
  startInputState,
  endInputState,
} from '../calendarcrud/Recoil';
import MiniCalendarStart from './MiniCalendarStart';
import MiniCalendarEnd from './MiniCalendarEnd';
import styled from 'styled-components';

interface ModalType {
  setModalOpen: (open: boolean) => void;
  startDate: Date;
}

const Modal = ({ setModalOpen, startDate }: ModalType) => {
  const Today = startDate.toLocaleDateString();
  const [selectStartDay, setSelectStartDay] = useState<Date | null>(startDate);
  const [selectEndDay, setSelectEndDay] = useState<Date | null>(null);
  const [showMiniCalendarStart, setShowMiniCalendarStart] = useState(false);
  const [showMiniCalendarEnd, setShowMiniCalendarEnd] = useState(false);

  const CompareDate = selectStartDay && selectEndDay && selectStartDay > selectEndDay;

  const modalRef = useRef<HTMLDivElement>(null);

  const [firstInputValue, setFirstInputValue] = useRecoilState(firstInputState);
  const [secondInputValue, setSecondInputValue] = useRecoilState(secondInputState);
  const [memoInputValue, setMemoInputValue] = useRecoilState(memoInputState);
  const [startInputValue, setStartInputValue] = useRecoilState(startInputState);
  const [endInputValue, setEndInputValue] = useRecoilState(endInputState);

  const handleStartDay = (date: Date | null) => {
    setSelectStartDay(date);
    if (date) {
      setStartInputValue(`${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`);
    } else {
      setStartInputValue(Today);
    }
  };

  const handleEndDay = (date: Date | null) => {
    setSelectEndDay(date);
    if (date) {
      setEndInputValue(`${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`);
    } else {
      setEndInputValue(Today);
    }
  };

  const onClickOutSide = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
      setFirstInputValue('');
      setSecondInputValue('');
      setMemoInputValue('');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFirstInputValue('');
    setSecondInputValue('');
    setMemoInputValue('');
    setSelectStartDay(null);
    setSelectEndDay(null);
  };

  const handleCreateClick = async () => {
    const newEventRef = ref(db, 'NewEvent/' + Date.now());
    await set(newEventRef, {
      firstInput: firstInputValue,
      secondInput: secondInputValue,
      memoInput: memoInputValue,
      startDate: selectStartDay
        ? `${selectStartDay.getFullYear()}. ${selectStartDay.getMonth() + 1}. ${selectStartDay.getDate()}.`
        : Today,
      endDate: selectEndDay
        ? `${selectEndDay.getFullYear()}. ${selectEndDay.getMonth() + 1}. ${selectEndDay.getDate()}.`
        : Today,
    });
  };

  const handleStartButtonClick = () => {
    setShowMiniCalendarStart(!showMiniCalendarStart);
    setShowMiniCalendarEnd(false);
  };

  const handleEndButtonClick = () => {
    setShowMiniCalendarEnd(!showMiniCalendarEnd);
    setShowMiniCalendarStart(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  });

  return (
    <Backdrop>
      <ModalLayout>
        <ModalBox ref={modalRef}>
          <ModalBtn>
            <XBtn onClick={() => closeModal()}>취소</XBtn>
            <NameBox>운동 일지</NameBox>
            <CreateBtn onClick={handleCreateClick} disabled={CompareDate ?? undefined}>
              추가
            </CreateBtn>
          </ModalBtn>
          <FirstContext>운동</FirstContext>
          <FirstInput value={firstInputValue} onChange={(e) => setFirstInputValue(e.target.value)} placeholder="운동" />
          <SecondContext>횟수 / 세트</SecondContext>
          <SecondInput
            value={secondInputValue}
            onChange={(e) => setSecondInputValue(e.target.value)}
            placeholder="횟수 / 세트"
          />
          <ContextBox>
            <StartContext>시작 날짜</StartContext>
            <EndContext>종료 날짜</EndContext>
          </ContextBox>
          <DateInputRow>
            <StartInputBox>
              <StartInput
                placeholder={
                  selectStartDay
                    ? `${selectStartDay.getFullYear()}. ${selectStartDay.getMonth() + 1}. ${selectStartDay.getDate()}.`
                    : Today
                }
                disabled
              ></StartInput>
              <CalendarIconStart
                onClick={handleStartButtonClick}
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_101_1442)">
                  <path
                    d="M7.46429 1.17857C7.46429 0.525446 6.93884 0 6.28571 0C5.63259 0 5.10714 0.525446 5.10714 1.17857V3.14286H3.14286C1.40938 3.14286 0 4.55223 0 6.28571V7.07143V9.42857V22C0 23.7335 1.40938 25.1429 3.14286 25.1429H18.8571C20.5906 25.1429 22 23.7335 22 22V9.42857V7.07143V6.28571C22 4.55223 20.5906 3.14286 18.8571 3.14286H16.8929V1.17857C16.8929 0.525446 16.3674 0 15.7143 0C15.0612 0 14.5357 0.525446 14.5357 1.17857V3.14286H7.46429V1.17857ZM2.35714 9.42857H19.6429V22C19.6429 22.4321 19.2893 22.7857 18.8571 22.7857H3.14286C2.71071 22.7857 2.35714 22.4321 2.35714 22V9.42857Z"
                    fill="#969696"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_101_1442">
                    <rect width="22" height="25.1429" fill="white" />
                  </clipPath>
                </defs>
              </CalendarIconStart>
              {showMiniCalendarStart && <MiniCalendarStart onDayClick={handleStartDay} />}
            </StartInputBox>
            ~
            <EndInputBox>
              <EndInput
                placeholder={
                  selectEndDay
                    ? `${selectEndDay.getFullYear()}. ${selectEndDay.getMonth() + 1}. ${selectEndDay.getDate()}.`
                    : Today
                }
                style={CompareDate ? { textDecoration: 'line-through', color: 'red' } : {}}
                disabled
              />
              <CalendarIconEnd
                onClick={handleEndButtonClick}
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_101_1442)">
                  <path
                    d="M7.46429 1.17857C7.46429 0.525446 6.93884 0 6.28571 0C5.63259 0 5.10714 0.525446 5.10714 1.17857V3.14286H3.14286C1.40938 3.14286 0 4.55223 0 6.28571V7.07143V9.42857V22C0 23.7335 1.40938 25.1429 3.14286 25.1429H18.8571C20.5906 25.1429 22 23.7335 22 22V9.42857V7.07143V6.28571C22 4.55223 20.5906 3.14286 18.8571 3.14286H16.8929V1.17857C16.8929 0.525446 16.3674 0 15.7143 0C15.0612 0 14.5357 0.525446 14.5357 1.17857V3.14286H7.46429V1.17857ZM2.35714 9.42857H19.6429V22C19.6429 22.4321 19.2893 22.7857 18.8571 22.7857H3.14286C2.71071 22.7857 2.35714 22.4321 2.35714 22V9.42857Z"
                    fill="#969696"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_101_1442">
                    <rect width="22" height="25.1429" fill="white" />
                  </clipPath>
                </defs>
              </CalendarIconEnd>
              {showMiniCalendarEnd && <MiniCalendarEnd onDayClick={handleEndDay} />}
            </EndInputBox>
          </DateInputRow>
          <MemoContext>메모</MemoContext>
          <MemoInput value={memoInputValue} onChange={(e) => setMemoInputValue(e.target.value)} placeholder="메모" />
        </ModalBox>
      </ModalLayout>
    </Backdrop>
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ModalLayout = styled.div`
  position: fixed;
  inset: 0px;
  display: flex;
  justify-content: center;
  z-index: 1200;
`;
const ModalBox = styled.div`
  width: 350px;
  height: 600px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 15px;
  margin-top: 180px;
  margin-bottom: 180px;
`;
const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;
const XBtn = styled.button`
  height: 32px;
  margin: 36px 0 0 20px;
  padding: 0px 16px;
  z-index: 1000;
  cursor: pointer;
  border: 1px solid #4cd964;
  border-radius: 5px;
  color: #4cd964;
`;
const CreateBtn = styled.button`
  height: 32px;
  margin: 36px 20px 0 0;
  padding: 0px 16px;
  z-index: 1000;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #4cd964;
`;
const NameBox = styled.div`
  margin-top: 40px;
  color: #000;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;
const FirstContext = styled.div`
  margin: 35px 0 0 25px;
  font-size: 14px;
`;
const FirstInput = styled.input`
  height: 34px;
  margin: 7px 0 0 23px;
  padding-left: 10px;
  width: 305px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;

  &:focus {
    outline: none;
    border: 1px solid #4cd964;
  }
`;
const SecondContext = styled.div`
  margin: 25px 0 0 25px;
  font-size: 14px;
`;
const SecondInput = styled.input`
  height: 34px;
  margin: 12px 0 0 23px;
  padding-left: 10px;
  width: 305px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;

  &:focus {
    outline: none;
    border: 1px solid #4cd964;
  }
`;
const ContextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StartContext = styled.div`
  margin: 29px 0 0 25px;
  font-size: 14px;
  width: 137px;
`;
const EndContext = styled.div`
  margin: 29px 21px 0 0;
  font-size: 14px;
  width: 137px;
`;
const DateInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 305px;
`;
const StartInputBox = styled.div`
  position: relative;
`;
const StartInput = styled.input`
  position: relative;
  height: 32px;
  margin: 5px 5px 5px 23px;
  padding-left: 13px;
  width: 142px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff;
`;
const CalendarIconStart = styled.svg`
  position: absolute;
  top: 11px;
  right: 14px;
  width: 18px;
  height: 20px;
  z-index: 200;
`;
const EndInputBox = styled.div`
  position: relative;
`;
const CalendarIconEnd = styled.svg`
  position: absolute;
  top: 11px;
  right: 32px;
  width: 18px;
  height: 20px;
  z-index: 200;
`;
const EndInput = styled.input`
  position: relative;
  height: 32px;
  margin: 5px 23px 5px 5px;
  padding-left: 13px;
  width: 142px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff;
`;
const MemoContext = styled.div`
  margin: 23px 0 0 25px;
  font-size: 14px;
`;
const MemoInput = styled.textarea`
  width: 305px;
  max-width: 305px;
  min-width: 305px;
  max-height: 100px;
  margin: 7px 0 0 23px;
  padding: 13px 0 120px 13px;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  background-color: #fff;
  scrollbar-width: none;
`;
