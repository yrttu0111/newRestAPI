/*
잘못된 요청이 들어올시 발생하는 HttpException을 처리하는 필터
*/
import {
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { AxiosError } from 'axios';
import e from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException) {
//         const status = exception.getStatus();
//         const messeage = exception.message;

//         console.log('======================');
//         console.log('애러 발생');
//         console.log('예외내용:', messeage);
//         console.log('예외코드:', status);
//         console.log('======================');
//     }
// }
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: unknown) {
        //default 예외
        const error = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: '서버 에러',
        };

        //http 예외
        if (exception instanceof HttpException) {
            error.status = exception.getStatus();
            error.message = exception.message;
        }
        //Axios 예외
        else if (exception instanceof AxiosError) {
            error.status = exception.response.status;
            error.message = exception.response.data.message;
        }
        console.log('======================');
        console.log('애러 발생');
        console.log('예외내용:', error.message);
        console.log('예외코드:', error.status);
        console.log('======================');
        //graphql 사용시
        // throw new ApolloError(error.message, error.status.toString());
    }
}
