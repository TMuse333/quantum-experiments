import React, { useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const generateDays = () => {
    const days = [];
    if (viewMode === 'month') {
      const daysInMonth = currentDate.daysInMonth();
      const firstDayOfMonth = currentDate.startOf('month').day();

      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="flex justify-center items-center h-12"></div>);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(
          <div
            key={i}
            className={`flex justify-center items-center h-12 border border-gray-200 hover:bg-gray-500 cursor-pointer ${
              selectedDate.isSame(currentDate.date(i), 'day') ? 'bg-blue-300' : ''
            }`}
            onClick={() => setSelectedDate(currentDate.date(i))}
          >
            {i}
          </div>
        );
      }
    } else {
      const startOfWeek = currentDate.startOf('isoWeek');
      for (let i = 0; i < 7; i++) {
        const day = startOfWeek.add(i, 'day');
        days.push(
          <div
            key={day.format('YYYY-MM-DD')}
            className={`flex justify-center items-center h-12 border border-gray-200 hover:bg-gray-500 cursor-pointer ${
              selectedDate.isSame(day, 'day') ? 'bg-blue-300' : ''
            }`}
            onClick={() => setSelectedDate(day)}
          >
            {day.format('D')}
          </div>
        );
      }
    }
    return days;
  };

  const prev = () => {
    if (viewMode === 'month') {
      setCurrentDate(currentDate.subtract(1, 'month'));
    } else {
      setCurrentDate(currentDate.subtract(1, 'week'));
    }
  };

  const next = () => {
    if (viewMode === 'month') {
      setCurrentDate(currentDate.add(1, 'month'));
    } else {
      setCurrentDate(currentDate.add(1, 'week'));
    }
  };

  const toggleView = () => {
    setViewMode(viewMode === 'month' ? 'week' : 'month');
  };

  const generateTimeSlots = () => {
    const slots = [];
    let startTime = dayjs().hour(9).minute(0).second(0);
    const endTime = dayjs().hour(17).minute(0).second(0);
    const appointmentDuration = 60; // Duration in minutes for each appointment
    const breakDuration = 5; // Break duration in minutes between appointments

    while (startTime.add(appointmentDuration, 'minute').isBefore(endTime)) {
      const endTimeSlot = startTime.add(appointmentDuration, 'minute');
      slots.push(
        <div
          key={`${startTime.format('HH:mm')}-${endTimeSlot.format('HH:mm')}`}
          className={`flex justify-center items-center h-12 border border-gray-200 hover:bg-gray-500 cursor-pointer ${
            selectedTimeSlot === startTime.format('HH:mm') ? 'bg-blue-300' : ''
          }`}
          onClick={() => setSelectedTimeSlot(startTime.format('HH:mm'))}
        >
          {`${startTime.format('HH:mm')} - ${endTimeSlot.format('HH:mm')}`}
        </div>
      );
      startTime = endTimeSlot.add(breakDuration, 'minute');
    }

    return slots;
  };



  return (
    <div className="w-[90vw] max-w-[1000px]  mt-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prev} className="px-4 py-2 bg-blue-500 text-white rounded">Previous</button>
        <h2 className="text-xl font-bold">
          {viewMode === 'month' ? currentDate.format('MMMM YYYY') : `Week of ${currentDate.startOf('isoWeek').format('MMM D, YYYY')}`}
        </h2>
        <button onClick={next} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
      <div className="flex justify-center mb-4">
        <button onClick={toggleView} className="px-4 py-2 bg-gray-500 text-white rounded">
          {viewMode === 'month' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="flex justify-center items-center h-12 font-bold">
            {day}
          </div>
        ))}
        {generateDays()}
      </div>
      <div className="w-[90vw] max-w-[1000px] bg-blue-300 mt-8 p-4 ml-auto mr-auto">
        <h1 className="font-bold text-2xl">Availability</h1>
        <h2 className="font-bold text-xl">{selectedDate.format('MMMM D, YYYY')}</h2>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {generateTimeSlots()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
