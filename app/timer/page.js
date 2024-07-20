'use client'

import React, {useState, useEffect} from 'react';

const Timer = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('John');

    // useEffect(() => {
    //     console.log("componenet being rendered or re-rendered each time without array")
    // })

    // useEffect(() => {
    //     console.log("component has mounted once")
    // }, []);

    useEffect(() => {
        console.log("count or name has changed therefore i am re-rendering")
    }, [count, name]);


    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <h1>{name}</h1>
            <button onClick={() => setName(name === 'John' ? 'Doe' : 'John')}>Toggle Name</button>
        </div>
    )
}

export default Timer;