import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { FC, useState } from "react";

export interface IPostFormProps { }

export const RegisterForm: FC<IPostFormProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessageUserName, setErrorMessageUserName] = useState<string | undefined>()
  const [errorMessagePassword, setErrorMessagePassword] = useState<string | undefined>()
  const [errorMessageEmail, setErrorMessageEmail] = useState<string | undefined>()

  const registerMutation = useMutation(
    {
      mutationFn: () => registerUser(username, password, email),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] })
      }
    },
    queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (username.length >= 5 && email.length >= 5 && password.length >= 8) {
      registerMutation.mutate();
    }
    if (username.length < 5) {
      setErrorMessageUserName("Надо более 5 символов!");
    }
    if (password.length < 8) {
      setErrorMessagePassword("Надо более 8 символов!");
    }
    if (email.length < 5) {
      setErrorMessageEmail("Надо более 5 символов!");
    }
  };


  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>
      <FormField label="Email">
        <input
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
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
      <Button>Зарегистрироваться</Button>
    </form>
  );
};
