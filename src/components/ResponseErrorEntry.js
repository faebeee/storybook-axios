import React from 'react';
export const ResponseErrorEntry = ({ data }) => {
    return React.createElement("pre", { className: "pre" }, data.message);
};
