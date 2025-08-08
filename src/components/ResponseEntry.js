import React from 'react';
import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
export const ResponseEntry = ({ data }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Title, { level: 2 }, "Response"),
        React.createElement(Divider, { orientation: "left", plain: true }, "Headers"),
        React.createElement("pre", { className: "pre" }, JSON.stringify(data.headers, null, 2)),
        React.createElement(Divider, { orientation: "left", plain: true }, "Data"),
        React.createElement("pre", { className: "pre" }, JSON.stringify(data.data, null, 2))));
};
