import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const SidePanel = ({children, shadowRight, shadowLeft, transparent, className}) => (
    <div className={classNames(
        'side-panel',
        {'side-panel--shadow-right': shadowRight},
        {'side-panel--transparent': transparent},
        {'side-panel--shadow-left': shadowLeft},
        className
    )}>
        {children}
    </div>
);

SidePanel.propTypes = {
    children: PropTypes.node,
    shadowRight: PropTypes.bool,
    shadowLeft: PropTypes.bool,
    transparent: PropTypes.bool,
    className: PropTypes.string,
};

SidePanel.defaultProps = {
    shadowRight: false,
    shadowLeft: false,
    transparent: false,
    className: ''
};