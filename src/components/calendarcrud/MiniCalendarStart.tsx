import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MiniLayout = styled.div`
  display: flex;
  justify-content: center;
`;
const MiniCalendarBox = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 295px;
  margin-top: 7px;
  padding: 0 10px 20px 10px;
  background-color: #e0e0e0;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  z-index: 1000;
`;
const MiniSwiperBox = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: space-between;
`;
const MiniLeftSwiperBtn = styled.button`
  width: 10px;
  height: 10px;
  margin-top: 15px;
  padding-left: 6px;
  color: #585757;
  background-color: #e0e0e0;
  font-size: 15px;
  border: none;
  cursor: pointer;
`;
const MiniRightSwiperBtn = styled.button`
  width: 10px;
  height: 10px;
  margin-top: 15px;
  padding-left: 10px;
  color: #585757;
  background-color: #e0e0e0;
  font-size: 15px;
  border: none;
  cursor: pointer;
`;
const MiniMonthYearBox = styled.div`
  grid-column: 3 / 6;
  height: 30px;
  margin-top: 15px;
  color: #4f4e4e;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
const MiniRightBox = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const MiniWeekBox = styled.div`
  padding: 5px;
  color: #969696;
  background-color: #ffffff;
  font-family: 'Inter-Medium', sans-serif;
  font-size: 10px;
  font-weight: 500;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: center;
`;
const MiniDay = styled.div`
  height: 30px;
  padding-left: 2px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: left;
  font-size: 10px;
`;
const CurrentMonthDay = styled(MiniDay)`
  color: #6e6e6e;
  background-color: white;
`;
const OtherMonthDay = styled(MiniDay)`
  color: gray;
  background-color: #d3d3d3;
`;

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

interface MiniCalendarStartType {
  onDayClick: (day: Date) => void;
}

const MiniCalendarStart: React.FC<MiniCalendarStartType> = ({ onDayClick }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const Week: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onDayClick(selectedDate);
  };

  const handlePrevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const handleNextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <MiniLayout>
      <MiniCalendarBox>
        <MiniSwiperBox>
          <MiniLeftSwiperBtn onClick={handlePrevMonth}>{'<'}</MiniLeftSwiperBtn>
          <MiniRightSwiperBtn onClick={handleNextMonth}>{'>'}</MiniRightSwiperBtn>
        </MiniSwiperBox>
        <MiniMonthYearBox>{`${months[date.getMonth()]}, ${date.getFullYear()}`}</MiniMonthYearBox>
        <MiniRightBox></MiniRightBox>

        {Week.map((day, index) => (
          <MiniWeekBox key={index}>{day}</MiniWeekBox>
        ))}
        {BeforeMonthDate.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return <MiniDay key={`start-${index}`}>{dayObj.day}</MiniDay>;
        })}
        {daysInMonth.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return (
            <MiniDay
              onClick={() => handleDayClick(dayObj.day)}
              style={{ backgroundColor: dayObj.day === selectedDay ? '#F3E5AB' : '#FFF' }}
              key={index}
            >
              {dayObj.day}
            </MiniDay>
          );
        })}
        {AfterMonthDate.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return <MiniDay key={`end-${index}`}>{dayObj.day}</MiniDay>;
        })}
      </MiniCalendarBox>
    </MiniLayout>
  );
};

export default MiniCalendarStart;
