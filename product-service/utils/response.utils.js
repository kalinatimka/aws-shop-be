export function successResponse(body) {
    return buildResponse(200, body);
}

export function failureResponse(body) {
    return buildResponse(500, body);
}

export function badRequestResponse(body) {
    return buildResponse(400, body);
}

export function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body),
    };
}
