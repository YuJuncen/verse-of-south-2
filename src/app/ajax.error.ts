export class UnexpectedAjaxResult extends Error {
}

export class BadResponseFormat extends UnexpectedAjaxResult {
    constructor(public accepted: any) { super(`We can't parse the response data into post.`); }
}

export class Non2xxHttpResponse extends UnexpectedAjaxResult {
    constructor(public withCode: number) { super(`Get bad http response with status code: ${withCode}.`); }

}
export class SomeOtherException extends UnexpectedAjaxResult {
    constructor(public cts: Error) { super(`Failed with other reason: [[ ${cts.message} ]]`); }
}
