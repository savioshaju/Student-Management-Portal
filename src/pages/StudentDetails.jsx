import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentByRollNumber } from '../assets/api';

import Loading from '../Components/Loading';
import Error from '../Components/Error';

const StudentDetails = () => {
  const { roll_number } = useParams();
  const [student, setStudent] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await getStudentByRollNumber(roll_number);
        setStudent(data);
        setOriginalData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch student');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [roll_number]);

  const handleMarksChange = (subject, value) => {
    const updatedMarks = {
      ...student.marks,
      [subject]: Number(value)
    };

    const total = Object.values(updatedMarks).reduce((sum, mark) => sum + (Number(mark) || 0), 0);
    const avg = total / Object.keys(updatedMarks).length;

    setStudent({
      ...student,
      marks: updatedMarks,
      total,
      average: avg.toFixed(2)
    });
  };

  const handleCancel = () => {
    setStudent(originalData);
    setIsEditing(false);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!student) return <p>No student found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 shadow-lg rounded-lg p-6 mt-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {isEditing ? (
            <input
              type="text"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              className="border p-1 rounded"
            />
          ) : (
            student.name
          )}
        </h2>
        <div className="space-x-2">
          {isEditing && (
            <button
              onClick={handleCancel}
              className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="mb-6 space-y-1">
        <p>
          <strong>Class:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={student.class}
              onChange={(e) => setStudent({ ...student, class: e.target.value })}
              className="border p-1 ml-2 rounded"
            />
          ) : (
            student.class
          )}
        </p>
        <p>
          <strong>Roll Number:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={student.roll_number}
              onChange={(e) => setStudent({ ...student, roll_number: e.target.value })}
              className="border p-1 ml-2 rounded"
            />
          ) : (
            student.roll_number
          )}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          {isEditing ? (
            <input
              type="email"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
              className="border p-1 ml-2 rounded"
            />
          ) : (
            student.email
          )}
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={student.phone}
              onChange={(e) => setStudent({ ...student, phone: e.target.value })}
              className="border p-1 ml-2 rounded"
            />
          ) : (
            student.phone
          )}
        </p>
        <p>
          <strong>Father's Name:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={student.father_name}
              onChange={(e) => setStudent({ ...student, father_name: e.target.value })}
              className="border p-1 ml-2 rounded"
            />
          ) : (
            student.father_name
          )}
        </p>
        <p>
          <strong>Mother's Name:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={student.mother_name}
              onChange={(e) => setStudent({ ...student, mother_name: e.target.value })}
              className="border p-1 ml-2 rounded"
            />
          ) : (
            student.mother_name
          )}
        </p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Marks & Grades</h3>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(student.marks || {}).map(([subject, mark]) => {
            let grade;
            if (mark >= 90) grade = 'A+';
            else if (mark >= 80) grade = 'A';
            else if (mark >= 70) grade = 'B';
            else if (mark >= 60) grade = 'C';
            else if (mark >= 50) grade = 'D';
            else grade = 'F';

            return (
              <tr key={subject}>
                <td className="border p-2">{subject}</td>
                <td className="border p-2">
                  {isEditing ? (
                    <input
                      type="number"
                      value={mark}
                      onChange={(e) => handleMarksChange(subject, e.target.value)}
                      className="border p-1 rounded w-20"
                    />
                  ) : (
                    mark
                  )}
                </td>
                <td className="border p-2">{grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <p>
          <strong>Total:</strong> {student.total}
        </p>
        <p>
          <strong>Average:</strong> {student.average}
        </p>
      </div>
    </div>
  );
};

export default StudentDetails;
