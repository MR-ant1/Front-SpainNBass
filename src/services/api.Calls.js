
const root = "http://localhost:4001/api/"
import { logout } from "../app/slices/userSlice";

export const loginCall = async (user) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    try {
        const response = await fetch(`${root}auth/login`, clientData);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        if (data.message === "Cant authentificate user") {
            dispatchEvent(logout({ tokenData: "" }))
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const registerCall = async (user) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };
    try {

        const response = await fetch(`${root}auth/register`, clientData)

        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error;
    }
}

export const GetProfile = async (token) => {
    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`          
        }
    }

    try {
        const response = await fetch(`${root}users/profile`, clientData)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const UpdateCall = async (token, user) => {
    const clientData = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }

    try {
        const response = await fetch(`${root}users/profile`, clientData)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const GetMyPosts = async (token) => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}posts`, clientData)

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const deleteMyPostCall = async (id, token) => {

    const clientData = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}posts/own/${id}`, clientData)

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const GetLatestsCall = async () => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const response = await fetch(`${root}latests`, clientData)

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}


export const GetGenrePostCall = async (token, topic) => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}posts/${topic}`, clientData)

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}


export const LikeCall = async (token, id) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}likes/${id}`, clientData)
       
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }

        return data

    } catch (error) {
        return error
    }
}

export const PostLikesCall = async (token, id) => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}likes/posts/${id}`, clientData)
       
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
     
        return data
        
    } catch (error) {
        return error
    }
}

export const GetCommentsCall = async (token, id) => {

    const clientData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}comments/${id}`, clientData)
       
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
     
        return data
        
    } catch (error) {
        return error
    }
}


export const newCommentCall = async (token, id) => {

    const clientData = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        const response = await fetch(`${root}comments/${id}`, clientData)
       
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
     
        return data
        
    } catch (error) {
        return error
    }
}