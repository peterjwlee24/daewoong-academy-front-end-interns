'use client'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    // an array to stored the fetched users from the external api we will call
    const [users, setUsers] = useState([]);
    // an array to store users filtered by the search term
    const [filteredUsers, setFilteredUsers] = useState([]);
    // a boolean state to indicate whether data is being loaded
    const [loading, setLoading] = useState(true);
    // a string to store the users search input
    const [filter, setFilter] = useState('');


    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const data = response.data;
            setTimeout(() => {
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            }, 4000); // 4 seconds delay
        } catch (error) {
            console.log("error fetching users: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, users]);
    

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10'>
            <h1 className = 'text-3xl font-bold mb-6'>User List</h1>
            <button
                onClick={fetchUsers}
                className='bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600'
            >
                Refresh Users
            </button>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder='Filter by name'
                className='mb-6 px-4 py-2 border rounded w-full max-w-md'
            />
            {
                loading ? (
                    <p className='text-blue-500'>Loading........</p>
                ) : (
                    <ul className='w-full max-w-md bg-white rounded-lg shadow-lg p-6'>
                        {
                            filteredUsers.map(user => (
                                <li key={user.id} className='border b border-gray-200 py-2'>
                                    <div className='font-semibold'>{user.name}</div>
                                    <div className='text-sm text-gray-600'>{user.email}</div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            
        </div>
    )
    
}

export default Search;