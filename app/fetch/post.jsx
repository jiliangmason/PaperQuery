export function postData(url, paramobj) {
    const myFetchOptions = {
        method: "POST",
        credentials: 'include', //包含cookies
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: paramsHandle(paramobj),
    };
    let result = fetch(url, myFetchOptions);
    return result;
}

function paramsHandle(obj) {
    let result = "";
    for (let key in obj) {
        result += '&' + key + '=' + encodeURIComponent(obj[key]);
    }
    if (result) {
        result = result.slice(1);
    }
    return result;
}