import React, { useState } from 'react';
import dayjs from 'dayjs';
import Calendar from '../calendar2/calendar2'; // Ensure the import path is correct

const Carousel: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const prevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Previous</button>
        <h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
      <div className="relative h-64 flex w-[20vw] bg-red-200 overflow-x-hidden">
        <div className="w-full absolute"
        style={{
            transform:'translateX(0%)'
        }}>
          <Calendar date={currentDate.subtract(1, 'month')} />
        </div>
        <div className="w-full"
        style={{
            transform:'translateX(100%)'
        }}>
          <Calendar date={currentDate} />
        </div>
        <div className="w-full"
        style={{
            transform:'translateX(200%)'
        }}>
          <Calendar date={currentDate.add(1, 'month')} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
