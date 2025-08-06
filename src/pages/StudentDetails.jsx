import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getStudentByRollNumber } from '../assets/api';
import { 
  setCurrentStudent,
  setCurrentError,
  setCurrentLoading 
} from '../redux/slice/students';

import Loading from '../Components/Loading';
import Error from '../Components/Error';
const StudentDetails = () => {
  const { roll_number } = useParams();
  const rollNumber=roll_number
  const dispatch = useDispatch();

  const { current, currentLoading, currentError } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        dispatch(setCurrentLoading());
        const student = await getStudentByRollNumber(rollNumber);
        dispatch(setCurrentStudent(student));
      } catch (err) {
        dispatch(setCurrentError(err.response?.data?.message || 'Failed to fetch student'));
      }
    };

    fetchStudent();
  }, [rollNumber, dispatch]);

  if (currentLoading) return <Loading />;
  if (currentError) return <Error message={currentError} />;

  if (!current) return <p>No student found.</p>;

  return (
    <div>
      <h2>{current.name}</h2>
      <p><strong>Class:</strong> {current.class}</p>
      <p><strong>Roll Number:</strong> {current.roll_number}</p>
      <p><strong>Email:</strong> {current.email}</p>
      <p><strong>Phone:</strong> {current.phone}</p>
      <p><strong>Father's Name:</strong> {current.father_name}</p>
      <p><strong>Mother's Name:</strong> {current.mother_name}</p>
      <h3>Marks:</h3>
      <ul>
        {Object.entries(current.marks || {}).map(([subject, mark]) => (
          <li key={subject}>
            {subject}: {mark}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> {current.total}</p>
      <p><strong>Average:</strong> {current.average}</p>
    </div>
  );
};

export default StudentDetails;
