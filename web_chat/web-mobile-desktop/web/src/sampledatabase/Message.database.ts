export interface IMessageDatabase{
    id: number,
    userid: number,
    context: string,
    datetime: string,
    kindOfMess: number,
    userHasReadList: number[],
    isResponseMess: boolean,
    responseMess?: number
}

export function instanceOfMessageDatabase(data: any): data is IMessageDatabase { 
    return typeof data.id === 'number' &&
    typeof data.userid === 'number' &&
    typeof data.context === 'string' &&
    typeof data.datetime === 'string' &&
    typeof data.kindOfMess === 'number' &&
    typeof data.userHasReadList === 'object' &&
    typeof data.isResponseMess === 'boolean' 
}

export const messageDatabase: IMessageDatabase[] = [
    {
        id:1,
        userid:1,
        context:"huy dz",
        datetime:"09:00 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:2,
        userid:1,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:01 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:3,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:02 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:4,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:03 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:5,
        userid:1,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:04 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:6,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:05 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:7,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:06 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:8,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:08 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:9,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:09",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:10,
        userid:3,
        context:"123",
        datetime:"09:09",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:11,
        userid:1,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:09",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:12,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:09 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:13,
        userid:2,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:09 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
    {
        id:14,
        userid:3,
        context:"Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and (optionally) JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
        datetime:"09:09 pm",
        kindOfMess:0,
        userHasReadList:[],
        isResponseMess:false,
    },
]