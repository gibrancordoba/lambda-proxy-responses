import { ApiCallback, ApiResponse, IErrorResponseBody } from './interfaces/api-interfaces';
import { ServerErrorStatus } from './interfaces/http-status-code-numbers';
import {
  // BadRequestException,
  ErrorResult,
  // ForbiddenException,
  // InternalServerErrorException,
  // NotFoundException,
  ServerErrorException,
} from './utils/errors';
import { HttpStatusCode } from './utils/http-status-codes';

/**
 * Contains helper methods to generate a HTTP response.
 */
export class ResponseBuilder {
  // public static badRequest(code: string, description: string, callback: ApiCallback): void {
  //   const errorResult: BadRequestResult = new BadRequestResult(code, description);
  //   ResponseBuilder._returnAs<BadRequestResult>(errorResult, HttpStatusCode.BadRequest, callback);
  // }

  // public static forbidden(code: string, description: string, callback: ApiCallback): void {
  //   const errorResult: ForbiddenResult = new ForbiddenResult(code, description);
  //   ResponseBuilder._returnAs<ForbiddenResult>(errorResult, HttpStatusCode.Forbidden, callback);
  // }

  public static serverError(code: ServerErrorStatus, error: Error, callback: ApiCallback): void {
    // tslint:disable-next-line:no-console
    console.log('serverError method', code, error, callback);
    const errorResult: ServerErrorException = new ServerErrorException(code, 'Internal Error...');
    // tslint:disable-next-line:no-console
    console.log('errorResult method', errorResult);
    ResponseBuilder._returnAs<ServerErrorException>(errorResult, HttpStatusCode.INTERNAL_SERVER_ERROR, callback);
  }

  // public static internalServerError(error: Error, callback: ApiCallback): void {
  //   const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, 'Sorry...');
  //   ResponseBuilder._returnAs<InternalServerErrorResult>(errorResult, HttpStatusCode.InternalServerError, callback);
  // }

  // public static notFound(code: string, description: string, callback: ApiCallback): void {
  //   const errorResult: NotFoundResult = new NotFoundResult(code, description);
  //   ResponseBuilder._returnAs<NotFoundResult>(errorResult, HttpStatusCode.NotFound, callback);
  // }

  public static ok<T>(result: T, callback: ApiCallback): void {
    // tslint:disable-next-line:no-console
    console.log('OK method', result, callback);
    ResponseBuilder._returnAs<T>(result, HttpStatusCode.OK, callback);
  }

  private static _returnAs<T>(result: T, statusCode: number, callback: ApiCallback): void {
    const bodyObject: IErrorResponseBody | T =
      result instanceof ErrorResult ? { statusCode, error: result.message } : result;

      // tslint:disable-next-line:no-console
    console.log('bodyObject _returnAs', bodyObject);
    const response: ApiResponse = {
      body: JSON.stringify(bodyObject),
      headers: {
        'Access-Control-Allow-Origin': '*', // This is required to make CORS work with AWS API Gateway Proxy Integration.
      },
      statusCode,
      // tslint:disable-next-line:object-literal-sort-keys
      isBase64Encoded: false,
    };

    callback(undefined, response);
  }
}
