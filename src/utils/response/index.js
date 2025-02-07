const responseObj = (success, message, error, data, statusCode) => {
    const response = {
        success,
        message,
        error,
        data,
        statusCode,
    };

    return JSON.stringify(response);
};

export { responseObj };
