import React, { useEffect, useState } from "react";

const Payment = () => {
  const [courseId, setCourseId] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    // Retrieve values from localStorage
    const storedCourseId = localStorage.getItem("selectedCourseId");
    const storedAmount = localStorage.getItem("selectedCourseAmount");

    if (storedCourseId) setCourseId(storedCourseId);
    if (storedAmount) setAmount(storedAmount);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Payment Page</h1>
      {courseId && amount ? (
        <div className="mt-5 p-5 border rounded shadow-md">
          <p className="text-lg">Course ID: <span className="font-bold">{courseId}</span></p>
          <p className="text-lg">Amount: <span className="font-bold">₹{amount}</span></p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Proceed to Payment
          </button>
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default Payment;
