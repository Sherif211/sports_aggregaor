export interface User {
    id: string
    firstName: string,
    picture: string,
    email: string,
    lastName: string,
    gender: string,
    registerDate: string,
    location: Location,
}

export interface Post {
    id: string
    text: string,
    image: string,
    likes: string,
    link: string,
    tags: string[],
    publishDate: string,
    owner: User
}

export interface Location {
    street: string,
    city: string,
    state: string,
    country: string,
    timezone: string
}

interface UsersResponse {
    data: User[]
}

