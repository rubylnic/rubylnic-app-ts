import { IUser } from "../interfaces/users.interface";

import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    DocumentSnapshot,
    DocumentData,
    DocumentReference,
    WithFieldValue,
} from "firebase/firestore";
const usersCollectionRef = collection(db, "userData");

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUsers: build.query<IUser[], void>({
            queryFn() {
                try {
                    const result = getDocs(usersCollectionRef);
                    const data = result.then(user => user?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                    return { data }
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: ['User'],
        }),
        getFavUsers: build.query<Promise<{ id: string; }[]>, void>({
            queryFn() {
                try {
                    const q = query(collection(db, "userData"), where("fav", "==", true));
                    const result = getDocs(q);
                    const data = result.then(lol => lol?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                    return { data }
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: ['User'],
        }),
        getUserById: build.query<IUser, string>({
            queryFn(arg) {
                try {
                    const result = getDoc(doc(db, "userData", arg));
                    const data = result.then(doc => doc.data())
                    return { data }
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: ['User'],

        }),
        createUser: build.mutation<Promise<DocumentReference<DocumentData>>, WithFieldValue<DocumentData>>({
            queryFn(data) {
                try {
                    const result = addDoc(usersCollectionRef, data);
                    return { data: result }
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: ['User'],
        }),
        editUserById: build.mutation({
            queryFn({ id, data }) {
                try {
                    const result = updateDoc(doc(db, "userData", id), { ...data });
                    return { data: result }
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: ['User'],
        }),
        deleteUserById: build.mutation({
            queryFn(id) {
                try {
                    const result = deleteDoc(doc(db, "userData", id));
                    useGetUsersQuery();
                    return { data: result }
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: ['User'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetUserByIdQuery, useEditUserByIdMutation, useCreateUserMutation, useDeleteUserByIdMutation, useGetFavUsersQuery } = usersApi