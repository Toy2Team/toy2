import React, { useRef, useEffect, useState } from 'react';
import MiniCalendarStart from '../../components/calendarcrud/MiniCalendarStart';
import MiniCalendarEnd from '../../components/calendarcrud/MiniCalendarEnd';
import styled from 'styled-components';
import { start } from 'repl';

const ModalLayout = styled.div`
  position: fixed;
  inset: 0px;
  display: flex;
  justify-content: center;
  z-index: 1200;
`;
const ModalBox = styled.div`
  width: 340px;
  height: 600px;
  background-color: #585757;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 130px;
  margin-bottom: 180px;
`;
const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;
const XBtn = styled.button`
  height: 32px;
  margin: 32px 0 0 20px;
  padding: 0px 13px;
  z-index: 1000;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #eeeeee;
`;
const CreateBtn = styled.button`
  height: 32px;
  margin: 32px 20px 0 0;
  padding: 0px 13px;
  z-index: 1000;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #eeeeee;
`;
const NameBox = styled.div`
  margin-top: 40px;
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
const FirstInput = styled.input`
  height: 34px;
  margin: 40px 0 0 23px;
  padding-left: 13px;
  width: 295px;
  border: none;
  border-radius: 8px;
`;
const SecondInput = styled.input`
  height: 34px;
  margin: 12px 0 0 23px;
  padding-left: 13px;
  width: 295px;
  border: none;
  border-radius: 8px;
`;
const WhiteBox = styled.div`
  position: relative;
  width: 295px;
  height: 110px;
  margin: 30px 0 0 23px;
  border-radius: 8px;
  background-color: #fff;
`;
const StartInput = styled.input`
  height: 32px;
  margin: 18px 0 0 17px;
  padding-left: 13px;
  width: 260px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
const StartDateBtn = styled.button`
  position: absolute;
  top: 23px;
  right: 23px;
  height: 22px;
  width: 90px;
  border: none;
  border-radius: 8px;
`;
const EndInput = styled.input`
  height: 32px;
  margin: 9px 0 0 17px;
  padding-left: 13px;
  width: 260px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
const EndDateBtn = styled.button`
  position: absolute;
  top: 64px;
  right: 23px;
  height: 22px;
  width: 90px;
  border: none;
  border-radius: 8px;
`;
const MemoInput = styled.textarea`
  width: 295px;
  max-width: 295px;
  max-height: 200px;
  margin: 30px 0 0 23px;
  padding: 13px 0 200px 13px;
  border-radius: 8px;
  background-color: #fff;
  scrollbar-width: none;
`;

interface ModalType {
  setModalOpen: (open: boolean) => void;
  startDate: Date;
}

const Modal: React.FC<ModalType> = ({ setModalOpen, startDate }) => {
  const Today = startDate.toLocaleDateString();
  const [selectStartDay, setSelectStartDay] = useState<Date | null>(startDate);
  const [selectEndDay, setSelectEndDay] = useState<Date | null>(null);
  const [showMiniCalendarStart, setShowMiniCalendarStart] = useState(false);
  const [showMiniCalendarEnd, setShowMiniCalendarEnd] = useState(false);
  const CompareDate = selectStartDay && selectEndDay && selectStartDay > selectEndDay;

  const modalRef = useRef<HTMLDivElement>(null);

  const useOnClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
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
    document.addEventListener('mousedown', useOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', useOnClickOutside);
    };
  });

  return (
    <ModalLayout>
      <ModalBox ref={modalRef}>
        <ModalBtn>
          <XBtn onClick={() => setModalOpen(false)}>취소</XBtn>
          <NameBox>일정 추가</NameBox>
          <CreateBtn disabled={CompareDate ?? undefined}>추가</CreateBtn>
        </ModalBtn>
        <FirstInput placeholder="운동" />
        <SecondInput placeholder="운동 시간 / 횟수" />
        <WhiteBox>
          <StartInput placeholder="시작" disabled></StartInput>
          <StartDateBtn onClick={handleStartButtonClick}>
            {selectStartDay
              ? `${selectStartDay.getFullYear()}. ${selectStartDay.getMonth() + 1}. ${selectStartDay.getDate()}.`
              : Today}
          </StartDateBtn>
          {showMiniCalendarStart && <MiniCalendarStart onDayClick={setSelectStartDay} />}
          <EndInput placeholder="종료" disabled />
          <EndDateBtn
            onClick={handleEndButtonClick}
            style={CompareDate ? { textDecoration: 'line-through', color: 'red' } : {}}
          >
            {selectEndDay
              ? `${selectEndDay.getFullYear()}. ${selectEndDay.getMonth() + 1}. ${selectEndDay.getDate()}.`
              : Today}
          </EndDateBtn>
          {showMiniCalendarEnd && <MiniCalendarEnd onDayClick={setSelectEndDay} />}
        </WhiteBox>
        <MemoInput placeholder="메모" />
      </ModalBox>
    </ModalLayout>
  );
};

export default Modal;
