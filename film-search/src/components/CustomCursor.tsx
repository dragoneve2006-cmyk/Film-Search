import {useEffect, useState} from 'react';

// Cursor custom 
const CustomCursor = () => {
    const [position, setPosition] = useState({x: 0,y: 0});

    useEffect(() => {
        //Nascondo il cursore di default
        document.body.style.cursor = 'none';

        //Movimento del cursore
        const moveCursor = (e: MouseEvent) => {
            setPosition({x: e.clientX, y: e.clientY});
        };

        document.addEventListener('mousemove', moveCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor)
        };

    }, []);

    //Stile per custom cursor
    return(
    <div
        style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            pointerEvents: 'none',
            zIndex: 9999,
            transform: `translate(${position.x - 5}px, ${position.y - 5}px)`,
            willChange: 'transform',
        }}
    />
);

}

export default CustomCursor;

