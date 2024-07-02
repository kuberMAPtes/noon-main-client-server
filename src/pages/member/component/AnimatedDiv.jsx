import React from 'react';
import { motion } from 'framer-motion';
import NormalButton from './NormalButton';
import { Col } from 'react-bootstrap';

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
      <Col xs={12} style={{width:"100%",padding:"0px"}}>
        <motion.div
            style={{padding:"0px 0px 0px 0px",margin:"0px 0px 2px 0px", width:"100%"}}
            initial={{ opacity: initialOpacity }}
            animate={animate}
            variants={variants}
            onClick={onClick}
        ><NormalButton
        style={{ width:"100%", display: 'inline', textAlign: 'center',border: '1px solid #000',borderRadius: '5px',padding:"0px"}}
        >
            {children}
          </NormalButton>
        </motion.div>
      </Col>
    );
};

export default AnimatedDiv;
