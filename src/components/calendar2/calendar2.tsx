import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

interface CalendarProps {
  date: dayjs.Dayjs;
}

const Calendar2: React.FC<CalendarProps> = ({ date }) => {
  const daysInMonth = date.daysInMonth();
  const firstDayOfMonth = date.startOf('month').day();

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="flex justify-center items-center h-12"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="flex justify-center items-center h-12 border border-gray-200">
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-bold">{date.format('MMMM YYYY')}</h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="flex justify-center items-center h-12 font-bold">
            {day}
          </div>
        ))}
        {generateDays()}
      </div>
    </div>
  );
};

export default Calendar2;
