// pages/cart.js
'use client';
import { useState, useEffect } from 'react';
import React from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (courseId) => {
    const newCart = cart.filter(course => course.id !== courseId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cart.map((course) => (
          <div key={course.id} className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
            <img className="w-full h-48 object-cover" src={course.image} alt={course.name} />
            <div className="flex flex-col flex-grow px-6 py-4">
              <div className="font-bold text-xl mb-2">{course.name}</div>
              <p className="text-gray-700 text-base flex-grow">{course.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button onClick={() => removeFromCart(course.id)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
