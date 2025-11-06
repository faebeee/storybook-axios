import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { FC, type FormEvent, useRef } from 'react';
import serializeFormData from '../src/utils/serialize-form-data';
import { getAxios } from '../utils/get-axios';

export interface FormProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
}

export const Form: FC<FormProps> = ({ url, method }) => {
  const form = useRef<HTMLFormElement>(null);

  const execRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) {
      return;
    }
    const formData = new FormData(form.current);
    if (['get', 'delete'].includes(method)) {
      getAxios()[method](url, { params: serializeFormData(formData) });
    } else {
      getAxios()[method](url, formData);
    }
  };

  return (
    <form ref={form} action={url} method={method} onSubmit={execRequest}>
      <Input value="Hello World" name="value"/>
      <Button type={'submit'}>
        Submit
      </Button>
    </form>
  );
};
