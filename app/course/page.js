// pages/index.js
'use client';
import { useState, useEffect } from 'react';
import Subject from '@/components/Subject';
import { SnackBar } from '@/components/SnackBar';

const courses = [
  {
    id: 1,
    name: "Mathematics",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/geometry.png",
    description: "An introduction to algebra, geometry, and calculus.",
    link: "https://www.khanacademy.org/math"
  },
  {
    id: 2,
    name: "Physics",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/physics.png",
    description: "Fundamentals of classical and modern physics.",
    link: "https://www.physicsclassroom.com/"
  },
  {
    id: 3,
    name: "Chemistry",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/chem.png",
    description: "Basic concepts of chemical reactions and properties.",
    link: "https://www.coursera.org/learn/chemistry-1"
  },
  {
    id: 4,
    name: "Biology",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/bio.png",
    description: "Study of living organisms and life processes.",
    link: "https://www.edx.org/learn/biology"
  },
  {
    id: 5,
    name: "History",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/history.png",
    description: "Exploring significant historical events and figures.",
    link: "https://www.ivc.edu/hum/history"
  },
  {
    id: 6,
    name: "Geography",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/geography.png",
    description: "Physical and human geography of the world.",
    link: "https://www.coursera.org/courses?query=geography"
  },
  {
    id: 7,
    name: "Literature",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/lit.png",
    description: "Analysis of classical and modern literary works.",
    link: "https://www.coursera.org/courses?query=literature"
  },
  {
    id: 8,
    name: "Computer Science",
    image: "https://palace-images.s3.us-east-2.amazonaws.com/frotnend-class/cs.png",
    description: "Introduction to programming and computer systems.",
    link: "https://www.codecademy.com/catalog/language/python"
  },
];

export default function Course() {
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [cart, setCart] = useState([]);
  const [snackbar, setSnackbar] = useState({ show: false, message: '' });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter(course =>
        course.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const addToCart = (course) => {
    const alreadyInCart = cart.some(item => item.id === course.id);
    if (alreadyInCart) {
      showSnackbar(`${course.name} is already in the cart`);
    } else {
      const newCart = [...cart, course];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      showSnackbar(`${course.name} has been added to the cart`);
    }
  };

  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });
    setTimeout(() => {
      setSnackbar({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Courses</h1>
      <input
        type="text"
        placeholder="Search courses"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
        {filteredCourses.map((course) => (
          <Subject key={course.id} course={course} onAddToCart={addToCart} />
        ))}
      </div>
      {snackbar.show && <SnackBar 
        backgroundColor="green" 
        message={snackbar.message} 
        handleFunction={() => setSnackbar({ show: false, message: '' })} 
        handleFunctionInput={null} 
      />}
    </div>
  );
}
