import { validateResponse } from "./validateResponse";


//создаём схему типа для юзера
export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
})

//создаём тип на основании схемы
export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then((response) => response.json())
        .then(data => UserSchema.parse(data))
}

// Регистрация пользователя
export function registerUser(username: string, password: string, email: string): Promise<void> {
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
