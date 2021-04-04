export default class Conditions {
    condition: any = {};
    arrayCondition: any = [];

    OP_EQ: string = "$eq";
    OP_NE: string = "$ne";
    OP_IS: string = "$is";
    OP_NOT: string = "$not";
    OP_OR: string = "$or";
    OP_AND: string = "$and";
    OP_GT: string = "$gt";
    OP_LT: string = "$lt";
    OP_GTE: string = "$gte";
    OP_LTE: string = "$lte";
    OP_BTW: string = "$between";
    OP_NOT_BTW: string = "$notBetween";
    OP_IN: string = "$in";
    OP_NOT_IN: string = "$notIn";
    OP_LIKE: string = "$like";
    OP_NOT_LIKE: string = "$notlike";
    OP_START_WITH: string = "$startsWith";
    OP_END_WITH: string = "$endsWith";
    
    constructor() {

    }

    // Equal
    eq = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_EQ, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_EQ, prefix, suffix);
    }

    // Not equal
    ne = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_NE, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_NE, prefix, suffix);
    }

    // Greater than
    gt = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_GT, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_GT, prefix, suffix);
    }

    // Less than
    lt = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_LT, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_LT, prefix, suffix);
    }

    // Greater than equal
    gte = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_GTE, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_GTE, prefix, suffix);
    }

    // Less than equal
    lte = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_LTE, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_LTE, prefix, suffix);
    }

    like = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_LIKE, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_LIKE, prefix, suffix);
    }

    notLike = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_NOT_LIKE, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_NOT_LIKE, prefix, suffix);
    }

    startWith = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_START_WITH, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_START_WITH, prefix, suffix);
    }

    endWith = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_END_WITH, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_END_WITH, prefix, suffix);
    }

    between = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_BTW, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_BTW, prefix, suffix);
    }

    notBetween = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_NOT_BTW, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_NOT_BTW, prefix, suffix);
    }

    in = (propertyName: string, value: [], prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_IN, prefix, suffix);
        this.simpleCondition(propertyName, value, this.OP_IN, prefix, suffix);
    }

    notIn = (propertyName: string, value: Object, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, value, this.OP_NOT_IN, prefix, suffix);
        return this.simpleCondition(propertyName, value, this.OP_NOT_IN, prefix, suffix);
    }

    isNull = (propertyName: string, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, null, this.OP_IS, prefix, suffix);
        this.simpleCondition(propertyName, null, this.OP_IS, prefix, suffix);
    }

    notNull = (propertyName: string, prefix?: string | null, suffix?: string | null) => {
        this.pushToArrayCondition(propertyName, null, this.OP_NOT, prefix, suffix);
        return this.simpleCondition(propertyName, null, this.OP_NOT, prefix, suffix);
    }

    or = (condition: []) => {
        this.condition[this.OP_OR] = condition;
        return this;
    }

    and = (condition: []) => {
        this.condition[this.OP_AND] = condition;
        return this;
    }

    simpleCondition = (propertyName: string, value: Object | null, condition: string, prefix?: string | null, suffix?: string | null) => {
        if (prefix != null) {
            value = prefix + value;
        }
        if (suffix != null) {
            value = value + suffix;
        }
        let objectQuery: any = {};
        objectQuery[condition] = value;
        this.condition[propertyName] = objectQuery;
        return this;
    }

    pushToArrayCondition = (propertyName: string, value: Object | null, condition: string, prefix?: string | null, suffix?: string | null) => {
        if (prefix != undefined) {
            value = prefix + value;
        }
        if (suffix != undefined) {
            value = value + suffix;
        }
        let objectQuery: any = {};
        objectQuery[condition] = value;
        let newCondition: any = {};
        newCondition[propertyName] = objectQuery
        this.arrayCondition.push(newCondition);
        return this;
    }

    buildOrCondition() {
        return this.arrayCondition;
    }

    buildAndCondition() {
        return this.arrayCondition;
    }

    buildCondition() {
        let whereCondition = {
            where: this.condition
        }
        return whereCondition;
    }
}