import { Button } from 'antd';
import { useRef } from 'react';
import React from 'react-dom';
import serializeFormData from '../src/utils/serialize-form-data';
import { getAxios } from '../utils/get-axios';
import { Input } from 'antd';

export const Form = ({ url, method }) => {
    const form = useRef(null);
    console.log(method);

    const execRequest = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current)
        if (['get', 'delete'].includes(method)) {
            getAxios()[method](url, { params: serializeFormData(formData) });
        } else {
            getAxios()[method](url, formData);
        }
    };

    return (<form ref={ form } action={ url } method={ method } onSubmit={ execRequest }>
        <Input value="Hello World" name="value"/>
        <Button htmlType="submit" type="primary">Submit</Button>
    </form>);
};
