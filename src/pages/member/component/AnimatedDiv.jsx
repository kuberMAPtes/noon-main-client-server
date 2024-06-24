import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDiv = ({ children,onClick, initialOpacity = 0, animate = 'myAnime'}) => {

    const variants = {
        myAnime: {
            opacity: [0, 1],
            transition: {
            duration: 0.6,
            ease: "linear",
            },
        },
    };

    return (
        <motion.div
            style={{ width:"50%", display: 'inline', textAlign: 'center',border: '1px solid #000',borderRadius: '10px'}}
            initial={{ opacity: initialOpacity }}
            animate={animate}
            variants={variants}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedDiv;
