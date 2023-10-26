/*
author:hientran -julia.th
description: class UserApiError{code, message}
*/
export class UserApiError {
    constructor(public code: number, public message: string) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg: string) {
      return new UserApiError(400, msg);
    }
    static InternalError(msg: string) {
      return new UserApiError(500, msg);
    }
    static ResourceNotFound(msg: string) {
      return new UserApiError(404, msg);
    }
    static FaultCredential(msg: string) {
      return new UserApiError(401, msg);
    }
    static forbidden(msg: string) {
        return new UserApiError(403, msg);
    }
  }