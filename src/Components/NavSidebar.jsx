import React, { useState, useEffect } from "react";
import { setStudents } from "../redux/slice/students";
import { useDispatch, useSelector } from "react-redux";

const NavSidebar = () => {
  const [selectedClass, setSelectedClass] = useState("All");
  const { allData } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedClass === "All") {
      dispatch(setStudents(allData));
    } else {
      const regex = new RegExp(`^${selectedClass}(?!\\d)`, "i");
      const filtered = allData.filter((student) => regex.test(String(student.class)));
      dispatch(setStudents(filtered));
    }
  }, [selectedClass, allData, dispatch]);


  const btnStyle = (cls) =>
    `px-4 py-2 rounded border text-sm font-medium w-full text-center ${selectedClass === cls
      ? "ring-2 ring-blue-500 bg-blue-100"
      : "bg-white hover:bg-gray-100"
    }`;


  return (
    <>
      <div className="w-56 min-h-screen bg-green-200 shadow-md px-6 py-20 space-y-4 sticky bottom-0 hidden md:block">
      </div>

      <div className="fixed w-56 min-h-screen  bg-gray-100 shadow-md px-6 py-20 mt-4 space-y-4 top-0 left-0 bottom-0 z-30 overflow-y-auto hide-scrollbar">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Select Class</h2>
        <button onClick={() => setSelectedClass("All")} className={btnStyle("All")}>All</button>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setSelectedClass(1)} className={btnStyle(1)}>1</button>
          <button onClick={() => setSelectedClass(2)} className={btnStyle(2)}>2</button>
          <button onClick={() => setSelectedClass(3)} className={btnStyle(3)}>3</button>
          <button onClick={() => setSelectedClass(4)} className={btnStyle(4)}>4</button>
          <button onClick={() => setSelectedClass(5)} className={btnStyle(5)}>5</button>
          <button onClick={() => setSelectedClass(6)} className={btnStyle(6)}>6</button>
          <button onClick={() => setSelectedClass(7)} className={btnStyle(7)}>7</button>
          <button onClick={() => setSelectedClass(8)} className={btnStyle(8)}>8</button>
          <button onClick={() => setSelectedClass(9)} className={btnStyle(9)}>9</button>
          <button onClick={() => setSelectedClass(10)} className={btnStyle(10)}>10</button>
          <button onClick={() => setSelectedClass(11)} className={btnStyle(11)}>11</button>
          <button onClick={() => setSelectedClass(12)} className={btnStyle(12)}>12</button>
        </div>
      </div>

    </>
  );
};

export default NavSidebar;