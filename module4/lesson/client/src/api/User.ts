import { z } from 'zod';
import { PostList, fetchPostList } from './Post';
import { useEffect, useState } from 'react';
import { validateResponse } from './validateResponse';


// заменили на полученный из zod
// export interface User {
//     id:string;
//     username: string;
// }


export const UserSchema = z.object({
    id: z.string(),
    username: z.string()
})

export type User = z.infer<typeof UserSchema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then((response) => response.json())
        .then(data => UserSchema.parse(data))
}

// Регистрация пользователя
export function registerUser(username: string, password: string, email?: string): Promise<void> {
    return fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email })
    }).then(() => undefined);
}

// Авторизация пользователя
export function login(username: string, password: string): Promise<void> {
    return fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
    }).then(validateResponse).then(() => undefined);
}

// Получить себя, проверка авторизованности
export function fetchMe(): Promise<User> {
    return fetch("/api/users/me")
        .then(validateResponse)
        .then(response => response.json())
        .then(data => UserSchema.parse(data))
}

export function fetchUsername(): Promise<string> {
    return fetch("/api/users/me")
        .then((response) => response.json())
        .then((data) => data.username);
}

export function fetchLogout(): Promise<Response> {
    return fetch("/api/logout", {
        method: "POST",
    })
    .then(response => response)
}