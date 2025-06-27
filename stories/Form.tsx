import { Button } from 'antd';
import { type FormEvent, useRef } from 'react';
import React from 'react';
import serializeFormData from '../src/utils/serialize-form-data';
import { getAxios } from '../utils/get-axios';
import { Input } from 'antd';

export interface FormProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
}

export const Form = ({ url, method }: FormProps) => {
    const form = useRef<HTMLFormElement>(null);
    console.log(method, url);

    const execRequest = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) {
            return;
        }
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
