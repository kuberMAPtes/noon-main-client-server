import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDiv = ({ children, initialOpacity = 0, animate = 'myAnime'}) => {

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
            initial={{ opacity: initialOpacity }}
            animate={animate}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedDiv;
