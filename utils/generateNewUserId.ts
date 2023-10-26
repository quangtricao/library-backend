/*
author:hientran -julia.th
file name: utils/generateNewUserId.ts
*/

import { UserType } from "../types/users";

export const generateNewUserId = (key: string, collection: UserType[]): string => {
    const existingIds = new Set(collection.map((item) => item.id));
    let newId: string;
    do {
        newId = `${key}-${Math.floor(Math.random() * 10000)}`;
    } while (existingIds.has(newId));
    return newId;
};
