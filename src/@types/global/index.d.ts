type CommomResponse = <T = any>(message?: T) => void;

declare namespace Express {
  interface User {
    userId: number;
    username: string;
  }
  interface Response {
    ok: CommomResponse;
    unauthorized: CommomResponse;
    badRequest: CommomResponse;
    created: CommomResponse;
    noContent: CommomResponse;
    movedPermanently: CommomResponse;
    paymentRequired: CommomResponse;
    forbidden: CommomResponse;
    notFound: CommomResponse;
    conflict: CommomResponse;
    internalServerError: CommomResponse;
    badGateway: CommomResponse;
  }
}
