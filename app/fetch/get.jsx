
export function getData(url) {
    const myFetchOptions = {
        method: "GET",
        credentials: 'include', //包含cookies
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    };
    let result = fetch(url, myFetchOptions);
    return result;
}

