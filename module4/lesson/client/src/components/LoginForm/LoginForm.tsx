import { FC, FormEventHandler, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { FormField } from '../FormField';
import { Button } from '../Button';
import './LoginForm.css';
import { login } from '../../api/User';
import { queryClient } from '../../api/queryClient';

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 const logimMutation =   useMutation({
    mutationFn: () => login(username, password),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]})
    }
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    logimMutation.mutate();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {logimMutation.error && <span>{logimMutation.error.message}</span>}

      <Button type="submit" title="Войти" isLoading={logimMutation.isPending} />
    </form>
  );
};
