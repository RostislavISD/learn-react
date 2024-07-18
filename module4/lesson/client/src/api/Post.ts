import {z} from 'zod';
import { validateResponse } from './validateResponse';
import { useEffect, useState } from 'react';



//Переделали через zod
// export interface Post {
//     /**
//      * Идентификатор поста
//      */
//     id: string
//     text: string
//     authorId: string
//     createdAt: number
// }


//Переделали через zod
//export type PostList = Post[];

// функция проверки приходящих значений с сервера вручную, когда TS будет вырезан. Заменили на zod
function isPost(data: unknown): boolean {
    return (typeof data === "object"
        && data !== null
        && "id" in data &&
        typeof data.id === "string" &&
        "text" in data &&
        typeof data.text === "string" &&
        "authorId" in data &&
        typeof data.authorId === "string" && 
        "createdAt" in data &&
        typeof data.createdAt === "number"
    )
}

//проверка данных через zod, продвинутая альтернатива проверке выше.Своего рода интерфейс.
export const PostSchema =  z.object({
        id: z.string(),
        text: z.string(),
        authorId: z.string(),
        createdAt: z.number(),
    }
);

//схема zod вызывается  для проверки так - PostSchema.parse({});

//из схемы zod можно вывести тип!
export type Post = z.infer<typeof PostSchema>

export const PostList = z.array(PostSchema)

export type PostList = z.infer<typeof PostList>

export const FetchPostListSchema = z.object({
    list: PostList
})

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostList():Promise<FetchPostListResponse> {
    return fetch("/api/posts")
    .then((response) =>  response.json()
    .then((data) => FetchPostListSchema.parse(data))
    )
}

interface IdleRequestState {
    status: "idle";
}

interface LoadingRequestState {
    status: "pending";
}

interface SuccessRequestState {
    status: "success";
    data: PostList;
}

interface ErrorRequestState {
    status: "error";
    error: unknown;
}

type RequestState =
    IdleRequestState |
    LoadingRequestState |
    SuccessRequestState |
    ErrorRequestState

//заменили на react query
export function usePostList() {
    const [state, setState] = useState<RequestState>({ status: "idle" });

    useEffect(() => {
        if (state.status === "pending") {
            fetchPostList().then((data) => {
                setState({ status: "success", data: data.list })
            }).catch((error) => {
                setState({ status: "error", error });
            });
        }
    }, [state]);

    useEffect(() => {
        setState({ status: "pending" });
    }, []);

    const refetch = () => {
        setState({ status: "pending" });
    }

    return {
        state,
        refetch
    }
}

export function createPost(text: string): Promise<void> {
    return fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
        }),
    }).then(validateResponse).then(() => undefined)

}