import { Request, Response } from 'express';

export const afterMiddleware = function (req: Request, res: Response) {
  console.log(req.method, res.statusCode);

  if (res.statusCode === 200) {
    if (req.method === 'GET') {
      console.log('Genre is found');
      return;
    }
    if (req.method === 'PUT') {
      console.log('Genre is updated');
      return;
    }
    return;
  }

  if (req.method === 'POST' && res.statusCode === 201) {
    console.log('Genre is created');
    return;
  }

  if (req.method === 'DELETE' && res.statusCode === 204) {
    console.log('Genre is deleted');
    return;
  }

  return;
};
