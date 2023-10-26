/*
author:hientran -julia.th
description: generate a user id automatically using Math random
*/
import { UserType } from "../../types/users";

export const generateNewUserId = (key: string, collection: UserType[]): string => {
    const existingIds = new Set(collection.map((item) => item.id));
    let newId: string;
    do {
        newId = `${key}-${Math.floor(Math.random() * 10000)}`;
    } while (existingIds.has(newId));
    return newId;
};