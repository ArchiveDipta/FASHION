    import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    const ctx =
      host.switchToHttp();

    const response =
      ctx.getResponse();

    const request =
      ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    // Temporary debug for 500 errors
    let debugMessage = undefined;
    if (status === HttpStatus.INTERNAL_SERVER_ERROR && exception instanceof Error) {
      debugMessage = exception.message;
    }

    // Handle Prisma Exceptions
    if (exception && typeof exception === 'object' && 'code' in exception) {
      const prismaError = exception as any;
      if (prismaError.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'Data already exists (Unique constraint failed)';
      } else if (prismaError.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
      } else if (prismaError.code === 'P2003') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed (Reference does not exist)';
      } else if (prismaError.code) {
        status = HttpStatus.BAD_REQUEST;
        message = `Database Error: ${prismaError.code}`;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      message,
      debug: debugMessage,
      timestamp:
        new Date().toISOString(),
    });
  }
}