import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../components/calendarcrud/Modal';
import Layout from '@/components/layout/Layout';

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [ModalOpen, setModalOpen] = useState<boolean>(false);

  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const BeforeMonthDate: Day[] = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => ({
    day: lastDayOfMonth.getDate() - i,
    isCurrentMonth: false,
  })).reverse();

  const AfterMonthDate = Array.from({ length: 6 - lastDayOfMonth.getDay() }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  useEffect(() => {
    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push({ day: i, isCurrentMonth: true });
    }
  }, [date]);

  const handlePrevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const handleNextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const handleNewEventClick = (): void => {
    setModalOpen(true);
    setStartDate(new Date());
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setModalOpen(true);
      const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
      setStartDate(clickedDate);
    }
  };

  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Layout>
      <Row>
        <CalendarBox>
          <SwiperBox>
            <LeftSwiperBtn onClick={handlePrevMonth}>
              <ChevronLeftIcon viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.43937 14.5447C3.85354 15.1369 3.85354 16.0986 4.43937 16.6908L13.4376 25.7866C14.0234 26.3788 14.9748 26.3788 15.5606 25.7866C16.1465 25.1945 16.1465 24.2328 15.5606 23.6406L7.62156 15.6154L15.5559 7.59019C16.1418 6.99801 16.1418 6.03631 15.5559 5.44413C14.9701 4.85196 14.0187 4.85196 13.4329 5.44413L4.43468 14.54L4.43937 14.5447Z"
                  fill="#4CD964"
                />
              </ChevronLeftIcon>
            </LeftSwiperBtn>
            <RightSwiperBtn onClick={handleNextMonth}>
              <ChevronRightIcon viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.5606 14.5447C16.1465 15.1369 16.1465 16.0986 15.5606 16.6908L6.56239 25.7866C5.97657 26.3788 5.02519 26.3788 4.43937 25.7866C3.85354 25.1945 3.85354 24.2328 4.43937 23.6406L12.3784 15.6154L4.44405 7.59019C3.85823 6.99801 3.85823 6.03631 4.44405 5.44413C5.02988 4.85196 5.98125 4.85196 6.56708 5.44413L15.5653 14.54L15.5606 14.5447Z"
                  fill="#4CD964"
                />
              </ChevronRightIcon>
            </RightSwiperBtn>
          </SwiperBox>
          <MonthYearBox>{`${date.getFullYear()}. ${months[date.getMonth()]}`}</MonthYearBox>
          <EventRow>
            <EventBtn onClick={handleNewEventClick}>운동 추가</EventBtn>
          </EventRow>

          {ModalOpen && <Modal setModalOpen={setModalOpen} startDate={startDate} />}

          {week.map((day, index) => (
            <WeekBox key={index}>{day}</WeekBox>
          ))}
          {BeforeMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`start-${index}`}>{dayObj.day}</Day>;
          })}
          {daysInMonth.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return (
              <Day key={index} onClick={() => handleDayClick(dayObj.day, dayObj.isCurrentMonth)}>
                {dayObj.day}
              </Day>
            );
          })}
          {AfterMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`end-${index}`}>{dayObj.day}</Day>;
          })}
        </CalendarBox>
      </Row>
    </Layout>
  );
};

export default Calendar;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const CalendarBox = styled.div`
  position: absolute;
  top: 90px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 900px;
  padding: 0 30px 30px 30px;
  border-radius: 40px;
`;
const SwiperBox = styled.div`
  grid-column: 1 / 2;
  position: relative;
  display: flex;
  gap: 10px;
`;
const LeftSwiperBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-top: 30px;
  padding: 8px 16px;
  color: #4cd964;
  font-size: 40px;
  border: 1px solid #4cd964;
  border-radius: 5px;
  cursor: pointer;
`;
const RightSwiperBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-top: 30px;
  padding: 8px 16px;
  color: #4cd964;
  font-size: 40px;
  border: 1px solid #4cd964;
  border-radius: 5px;
  cursor: pointer;
`;
const ChevronLeftIcon = styled.svg`
  position: absolute;
  top: 32px;
  left: 7px;
  width: 20px;
  height: 27px;
`;
const ChevronRightIcon = styled.svg`
  position: absolute;
  top: 32px;
  right: 48px;
  width: 20px;
  height: 27px;
`;
const MonthYearBox = styled.div`
  grid-column: 3 / 6;
  height: 60px;
  margin-top: 23px;
  color: #4f4e4e;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
const EventRow = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const EventBtn = styled.button`
  width: 90px;
  height: 30px;
  margin-top: 30px;
  color: white;
  background-color: #4cd964;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const WeekBox = styled.div`
  padding: 4px 0;
  color: #969696;
  background-color: #ffffff;
  font-family: 'Inter-Medium', sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: center;
`;
const Day = styled.div`
  height: 117px;
  padding-top: 5px;
  padding-left: 5px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: left;
`;
const CurrentMonthDay = styled(Day)`
  color: #6e6e6e;
  background-color: white;
`;
const OtherMonthDay = styled(Day)`
  color: gray;
  background-color: #d3d3d3;
`;
