/*
author:hientran -julia.th
*/
const { v4: uuidv4 } = require('uuid');
  
  // Generate tokens (you can use your own token generation logic)
export const jwtToken = uuidv4(); // Example: Generating a random UUID as a token
export const refreshToken = uuidv4(); // Example: Generating a random UUID as a token
