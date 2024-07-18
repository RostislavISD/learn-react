import { FC, FormEventHandler, useState } from 'react';

import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';


import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/Post';
import { queryClient } from '../../api/queryClient';

export interface IPostFormProps { }

const CreatePostSchema = z.object({
  text: z.string().min(10, "Должная длина 10 символов")
});

type CreatePostForm = z.infer<typeof CreatePostSchema>

export const PostForm: FC<IPostFormProps> = () => {

  //заменили на @hookform
  //const [text, setText] = useState("");

  const {register, handleSubmit, formState:{errors}} = useForm<CreatePostForm>({
    resolver:  zodResolver(CreatePostSchema),
  })

  // Валидация по длине сообщения.
  // Заменили на @hookform
  // const [errorMessage, setErrorMessage] = useState<string | undefined>()


  // const createPostMutation = useMutation({
  //   mutationFn: () => createPost(text),
  //   onSuccess() {
  //     queryClient.invalidateQueries({
  //       queryKey: ["posts"]
  //     })
  //   }

  // }, queryClient);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      })
    }

  }, queryClient);

  

  // const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();

  //   if (text.length > 10) {
  //     createPostMutation.mutate();
  //   } else {
  //     setErrorMessage("Надо более 10 символов!")
  //   }
  // };

  // return (
  //   <form onSubmit={handleSubmit} className="post-form">
  //     <FormField label="Текст поста">
  //       <textarea className="post-form__input"
  //         value={text}
  //         onChange={(event) => {
  //           setText(event.currentTarget.value);
  //           setErrorMessage(undefined);
  //         }} />
  //     </FormField>

  //     {errorMessage && <span style={{color: "red"}}>{errorMessage}</span>}

  //     <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending} />
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit(({text}) => {
      createPostMutation.mutate(text)
    })} className="post-form">
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea className="post-form__input"
        {...register("text")}
        />
      </FormField>

      <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending} />
    </form>
  );
};
