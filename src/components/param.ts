
class Param {

    public name: string;
    public datatype: string;
    public paramtype: string;
    public isOptional: boolean;

    static jsxFactory(args: any, children: any[]): Param | undefined {
        if (Param.validateParam(args)) {
            const newParam: Param = new Param(args.name, args.datatype, args.paramtype, args.optional);
            return newParam;
        } else {
            return;
        }
    }

    static validateParam(args: any) {
        let isValid = true;

        if (!args.name) {
            throw new Error('Param must have a name');
            isValid = false;
        } else if (!args.datatype) {
            throw new Error('Param must have a valid dataType');
            isValid = false;
        } else if (!args.paramtype) {
            throw new Error('Param must have a valid paramType');
            isValid = false;
        }

        return isValid;
    }

    public isResponseLiteralDelegate() {
        return false;
    }

    constructor(name: string,  dataType: string, paramType: string, optional: boolean = false) {
        this.name = name;
        this.datatype = dataType;
        this.paramtype = paramType;
        this.isOptional = optional;
    }
}

export default Param;