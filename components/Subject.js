import React from 'react';

const Subject = ({ course, onAddToCart }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-between">
      <div>
        <img className="w-full h-48 object-cover" src={course.image} alt={course.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{course.name}</div>
          <p className="text-gray-700 text-base">{course.description}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a href={course.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Course
        </a>
        <button onClick={() => onAddToCart(course)} className="ml-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Subject;
