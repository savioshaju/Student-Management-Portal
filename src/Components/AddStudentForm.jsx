import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    roll_number: '',
    email: '',
    phone: '',
    father_name: '',
    mother_name: '',
    marks: {
      Math: '',
      'Computer Science': '',
      Chemistry: '',
      Physics: '',
      Biology: ''
    },
    total: 0,
    average: 0,
  });

  const [errors, setErrors] = useState({});

  const subjects = ['Math', 'Computer Science', 'Chemistry', 'Physics', 'Biology'];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.class.trim()) newErrors.class = 'Class is required';
    if (!formData.roll_number.trim()) newErrors.roll_number = 'Roll number is required';
    if (!formData.father_name.trim()) newErrors.father_name = "Father's name is required";
    if (!formData.mother_name.trim()) newErrors.mother_name = "Mother's name is required";

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone number must be exactly 10 digits';


    for (const subject of subjects) {
      const val = formData.marks[subject];
      if (val === '') {
        newErrors[subject] = `${subject} mark is required`;
      } else if (isNaN(val) || val < 0 || val > 100) {
        newErrors[subject] = `${subject} must be a number between 0 and 100`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMarksChange = (subject, value) => {
    const updatedMarks = {
      ...formData.marks,
      [subject]: value,
    };

    const numericMarks = Object.values(updatedMarks).map(Number);
    const total = numericMarks.reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);
    const avg = numericMarks.length ? total / numericMarks.length : 0;
    
    const updatedFormData = {
      ...formData,
      marks: updatedMarks,
      total,
      average: avg.toFixed(2),
    };

    setFormData(updatedFormData);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const existing = JSON.parse(localStorage.getItem('students')) || [];
    const updatedList = [...existing, formData];
    localStorage.setItem('students', JSON.stringify(updatedList));

    alert('Student added successfully.');
    navigate('/'); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Add New Student</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Class"
            value={formData.class}
            onChange={(e) => handleChange('class', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.class && <p className="text-red-600 text-sm">{errors.class}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Roll Number"
            value={formData.roll_number}
            onChange={(e) => handleChange('roll_number', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.roll_number && <p className="text-red-600 text-sm">{errors.roll_number}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Father's Name"
            value={formData.father_name}
            onChange={(e) => handleChange('father_name', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.father_name && <p className="text-red-600 text-sm">{errors.father_name}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Mother's Name"
            value={formData.mother_name}
            onChange={(e) => handleChange('mother_name', e.target.value)}
            className="border p-2 rounded w-full"
          />
          {errors.mother_name && <p className="text-red-600 text-sm">{errors.mother_name}</p>}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Marks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div key={subject}>
              <input
                type="number"
                placeholder={`${subject} Marks`}
                value={formData.marks[subject]}
                onChange={(e) => handleMarksChange(subject, e.target.value)}
                className="border p-2 rounded w-full"
              />
              {errors[subject] && <p className="text-red-600 text-sm">{errors[subject]}</p>}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p><strong>Total:</strong> {formData.total}</p>
          <p><strong>Average:</strong> {formData.average}</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddStudentForm;
