// const ErrorResponse = ({
//     error = {},
//     statusCode = STATUS_CODES.INTERNAL_SERVER,
//     message = 'Something went wrong',
// }) => {
//     return {
//         success: false,
//         message,
//         data: {},
//         error,
//         statusCode,
//     };
// };
const ErrorResponse = {
    success: false,
    message: 'Something went wrong',
    data: {},
    error: {},
};

export { ErrorResponse };
