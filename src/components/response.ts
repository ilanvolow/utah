
class Response {

    public code: number;
    public message: string;
    public name: string;


    static jsxFactory(args: any, children: any[]): Response | undefined {

        if (Response.validateResponse(args.code, args.name, args.message)) {
           const newResponse: Response = new Response(args.code, args.name, args.message);
           return newResponse;
        } else {
            return;
        }
    }

    static validateResponse(code: string, name: string, message: string) {
        let isValid = true;
        if (!code) {
            throw new Error('Response must have a http code');
            isValid = false;
        } else if (isNaN(parseInt(code))) {
            throw new Error('Response http code is not a valid integer');
            isValid = false;
        } else if (!name) {
            throw new Error('Response must have a reference name');
            isValid = false;
        }

        return isValid;
    }

    public isResponseLiteralDelegate() {
        return false;
    }

    constructor(errcode: number, name: string, message: string) {
        this.code = errcode;
        this.name = name;
        this.message = message;
    }
}

export default Response;