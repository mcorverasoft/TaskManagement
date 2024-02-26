export interface BaseResponseDTO {
    successful:boolean,
    status:string,
    transactionId:string,
    date: string
    message: string
    data: any
    errorResponse:ErrorResponse;
}
export interface ErrorResponse {
    type: string,
    errors: string[]
}