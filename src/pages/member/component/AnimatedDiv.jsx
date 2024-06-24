import React from 'react';
import { motion } from 'framer-motion';
import NormalButton from './NormalButton';

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
            style={{padding:"10px 0px 10px 0px",margin:"0px"}}
            initial={{ opacity: initialOpacity }}
            animate={animate}
            variants={variants}
            onClick={onClick}
        ><NormalButton
        style={{ width:"100%", display: 'inline', textAlign: 'center',border: '1px solid #000',borderRadius: '5px'}}
        >
            {children}
          </NormalButton>
        </motion.div>
    );
};

export default AnimatedDiv;
