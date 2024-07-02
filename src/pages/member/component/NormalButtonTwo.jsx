import React from 'react';
import module from '../../../assets/css/module/member/base.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const NormalButtonTwo = ({ children, className, style, ...props }) => {
  return (
    <button
      type="button"
      className={classNames(module.typicalButtonColorTwo, className)}
      style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 10, paddingRight: 10, margin: 0, ...style }}
      {...props}
    >
      {children}
    </button>
  );
};

NormalButtonTwo.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object, // style prop 타입 정의
};

export default NormalButtonTwo;