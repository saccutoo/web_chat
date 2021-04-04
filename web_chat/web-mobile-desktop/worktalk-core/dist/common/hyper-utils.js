"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperUtils = void 0;
// @ts-nocheck
var lodash_1 = require("lodash");
exports.HyperUtils = {
    // javascript object types
    TYPE_OBJECT: 'object',
    TYPE_FUNCTION: 'function',
    TYPE_STRING: 'string',
    TYPE_UNDEFINED: 'undefined',
    //
    // key code
    KEY_CODE_BACKSPACE: 8,
    KEY_CODE_ESC: 27,
    KEY_CODE_ENTER: 13,
    KEY_CODE_LEFT: 37,
    KEY_CODE_RIGHT: 39,
    KEY_CODE_UP: 38,
    KEY_CODE_DOWN: 40,
    KEY_CODE_DELETE: 46,
    KEY_CODE_COMMA: 188,
    KEY_CODE_DOT: 190,
    KEY_CODE_TAB: 9,
    KEY_CODE_SPACE: 32,
    CHAR_POSSIBLE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    //
    RIGHT_CLICK_CODE: [2, 3],
    //
    STR_COMMA: ',',
    STR_DOT: '.',
    STR_SPACE: ' ',
    MSG_BUNDLES: [
        'common',
        'schedule',
        'tempmsg',
        'security',
        'error',
        'help',
        'ihcm',
        'tip',
        'crm',
        'rap',
    ],
    //
    AVG_TIME_TEMPLATE_RENDER: 300,
    FAST_TIME_RENDER: 10,
    //
    GOAL_ATTACH_SIZE: 7,
    //
    DATA_UNIT_B: Math.pow(2, 0),
    DATA_UNIT_KB: Math.pow(2, 10),
    DATA_UNIT_MB: Math.pow(2, 20),
    DATA_UNIT_GB: Math.pow(2, 30),
    DATA_UNIT_TB: Math.pow(2, 40),
    DATA_UNIT_PB: Math.pow(2, 50),
    DATA_UNIT_EB: Math.pow(2, 60),
    DATA_UNIT_ZB: Math.pow(2, 70),
    DATA_UNIT_YB: Math.pow(2, 80),
    DATA_UNIT_BB: Math.pow(2, 90),
    DATA_UNIT_GEB: Math.pow(2, 100),
    MAP_UNIT_MEASURE: {
        B: Math.pow(2, 0),
        KB: Math.pow(2, 10),
        MB: Math.pow(2, 20),
        GB: Math.pow(2, 30),
        TB: Math.pow(2, 40),
        PB: Math.pow(2, 50),
        EB: Math.pow(2, 60),
        ZB: Math.pow(2, 70),
        YB: Math.pow(2, 80),
        BB: Math.pow(2, 90),
        GEB: Math.pow(2, 100),
    },
    mapRegrex: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    },
    listTagRegrex: {},
    isEmpty: function (value) {
        return (value === '' ||
            value === undefined ||
            value === null ||
            value.length === 0 ||
            value === 'null' ||
            value === 'undefined' ||
            (exports.HyperUtils.isPlainObject(value) && Object.keys(value).length === 0));
    },
    isNotEmpty: function (value) {
        return !exports.HyperUtils.isEmpty(value);
    },
    isNil: function (value) {
        return value === undefined || value === null;
    },
    isNotNil: function (value) {
        return !exports.HyperUtils.isNil(value);
    },
    isBoNil: function (bo) {
        return exports.HyperUtils.isNil(bo) || exports.HyperUtils.isNil(bo.id);
    },
    isBoNotNil: function (bo) {
        return !exports.HyperUtils.isBoNil(bo);
    },
    isTrue: function (value) {
        return value == true || value == 'true';
    },
    isFalse: function (value) {
        return !exports.HyperUtils.isTrue(value);
    },
    executeVal: function (value, params) {
        if (exports.HyperUtils.isFunction(value)) {
            return value(params);
        }
        else {
            return value;
        }
    },
    val: function (text) {
        try {
            var returnVal = eval(text);
            return returnVal;
        }
        catch (e) {
            return null;
        }
    },
    valueIn: function (value, collection) {
        if (exports.HyperUtils.isEmpty(collection)) {
            return false;
        }
        if (exports.HyperUtils.isArray(collection)) {
            return collection.indexOf(value) != -1;
        }
        else {
            return exports.HyperUtils.isNotEmpty(collection[value]);
        }
        return false;
    },
    valueListIn: function (values, collection) {
        if (exports.HyperUtils.isEmpty(values) || exports.HyperUtils.isEmpty(collection)) {
            return false;
        }
        var i;
        for (i in values) {
            if (!exports.HyperUtils.valueIn(values[i], collection)) {
                return false;
            }
        }
        return true;
    },
    collectionContains: function (collection, value) {
        return exports.HyperUtils.valueIn(value, collection);
    },
    collectionContainsOne: function (collection, values) {
        if (exports.HyperUtils.isEmpty(collection) || exports.HyperUtils.isEmpty(values)) {
            return false;
        }
        var i;
        for (i in values) {
            if (exports.HyperUtils.valueIn(values[i], collection)) {
                return true;
            }
        }
        return false;
    },
    getCharPossiple: function () {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    },
    genRandomID: function (length) {
        if (exports.HyperUtils.isEmpty(length)) {
            length = 5;
        }
        var text = '';
        for (var i = 0; i < length; i++) {
            text += exports.HyperUtils.getCharPossiple().charAt(Math.floor(Math.random() * exports.HyperUtils.getCharPossiple().length));
        }
        return text;
    },
    getRequestAjaxByUrl: function (url) {
        return url;
    },
    getRequestByUrl: function (url) {
        return url;
    },
    toFormDataByBean: function (bean) {
        var formObj = { bean: bean };
        return exports.HyperUtils.toFormDataByForm(formObj);
    },
    toFormDataByForm: function (formObj) {
        var form = formObj;
        if (exports.HyperUtils.isEmptyObject(form)) {
            return null;
        }
        if (exports.HyperUtils.isEmptyObject(form.bean)) {
            delete form.bean;
        }
        return $.param(exports.HyperUtils.getRequestFormData(form), true);
    },
    toFormData: function (requestForm) {
        return $.param(requestForm, true);
    },
    getRequestFormData: function (data) {
        var result = {};
        function process(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            }
            else if (Array.isArray(cur)) {
                result[prop] = cur;
            }
            else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    process(cur[p], prop ? prop + '.' + p : p);
                }
                if (isEmpty && prop) {
                    result[prop] = {};
                }
            }
        }
        process(data, '');
        return result;
    },
    checkUpdateField: function (bo, dbBo, fieldName, applyNull) {
        if (!applyNull && exports.HyperUtils.isEmpty(bo[fieldName])) {
            return false;
        }
        return bo[fieldName] != dbBo[fieldName];
    },
    settingUpdateFields: function (bo, dbBo, updateFieldNames, fieldNames, applyAllNull, removeNotApplyField) {
        var i;
        for (i in fieldNames) {
            if (exports.HyperUtils.BeanUtil.checkUpdateField(bo, dbBo, fieldNames[i], applyAllNull)) {
                updateFieldNames.push(fieldNames[i]);
            }
            else {
                exports.HyperUtils.collectionRemove(updateFieldNames, fieldNames[i]);
                if (removeNotApplyField) {
                    delete bo[fieldNames[i]];
                }
            }
        }
    },
    validateUpdateField: function (bo, updateFieldNames, fieldName, condition) {
        if (condition) {
            if (exports.HyperUtils.isNotEmpty(bo[fieldName]) && updateFieldNames.indexOf(fieldName) == -1) {
                updateFieldNames.push(fieldName);
            }
        }
        else {
            exports.HyperUtils.collectionRemove(updateFieldNames, fieldName);
            delete bo[fieldName];
        }
    },
    applyUpdateField: function (obj, updateFields, fieldName, newValue, oldValue, applyNull) {
        if (!exports.HyperUtils.compare(newValue, oldValue) && (applyNull || exports.HyperUtils.isNotEmpty(newValue))) {
            obj[fieldName] = newValue;
            updateFields.push(fieldName);
        }
        else {
            exports.HyperUtils.collectionRemove(updateFields, fieldName);
        }
    },
    compare: function (obj1, obj2) {
        if (exports.HyperUtils.isEmpty(obj1) && exports.HyperUtils.isEmpty(obj2)) {
            return true;
        }
        if (exports.HyperUtils.isEmpty(obj1) || exports.HyperUtils.isEmpty(obj2)) {
            return false;
        }
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    },
    compareCollection: function (col1, col2) {
        if (exports.HyperUtils.isEmpty(col1) && exports.HyperUtils.isEmpty(col2)) {
            return true;
        }
        if (exports.HyperUtils.isEmpty(col1) || exports.HyperUtils.isEmpty(col2)) {
            return false;
        }
        if (col1.length != col2.length) {
            return false;
        }
        /*Todo: Can them cho cac truong hop khac primitive*/
        var i;
        for (i in col1) {
            if (!exports.HyperUtils.valueIn(col1[i], col2)) {
                return false;
            }
        }
        for (i in col2) {
            if (!exports.HyperUtils.valueIn(col2[i], col1)) {
                return false;
            }
        }
        return true;
    },
    compareDateString: function (sdate1, sdate2) {
        var date1 = JDateUtil.getDateFormat(sdate1, JDateUtil.FORMAT_DATE_TIME_JSON);
        var date2 = JDateUtil.getDateFormat(sdate2, JDateUtil.FORMAT_DATE_TIME_JSON);
        if (exports.HyperUtils.isEmpty(date1) && exports.HyperUtils.isEmpty(date2)) {
            return 0;
        }
        if (exports.HyperUtils.isEmpty(date1) || exports.HyperUtils.isEmpty(date2)) {
            return exports.HyperUtils.isEmpty(date1) ? -1 : 1;
        }
        return date1.getTime() - date2.getTime();
    },
    getUrlParam: function (paramName) {
        paramName = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + paramName + '=([^&#]*)'), results = regex.exec(window.location.search);
        return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    concatArray: function (a, b, fieldKey) {
        var returnVal = [];
        var keys = [];
        var i;
        var x = b.concat(a);
        for (i in x) {
            if (exports.HyperUtils.isEmpty(fieldKey) || keys.indexOf(x[i][fieldKey]) == -1) {
                returnVal.push(x[i]);
            }
            if (exports.HyperUtils.isNotEmpty(fieldKey)) {
                if (keys.indexOf(x[i][fieldKey]) == -1) {
                    keys.push(x[i][fieldKey]);
                }
            }
        }
        return returnVal;
    },
    equalInputVal: function (source, target) {
        if (exports.HyperUtils.isEmpty(source) && exports.HyperUtils.isEmpty(target)) {
            return true;
        }
        return source == target;
    },
    orAll: function (arrayInt) {
        if (exports.HyperUtils.isNotEmpty(arrayInt)) {
            var i, returnVal = 0;
            for (i in arrayInt) {
                returnVal = returnVal | arrayInt[i];
            }
            return returnVal;
        }
        return 0;
    },
    countCollection: function (collection) {
        if (exports.HyperUtils.isEmpty(collection)) {
            return 0;
        }
        if (exports.HyperUtils.isArray(collection)) {
            return collection.length;
        }
        else {
            return Object.keys(collection).length;
        }
        return null;
    },
    arrayChangeItemPosition: function (array, oldIndex, newIndex) {
        if (exports.HyperUtils.isEmpty(array)) {
            return;
        }
        if (oldIndex == -1 || oldIndex > array.length) {
            return;
        }
        if (newIndex == -1 || newIndex > array.length) {
            return;
        }
        var obj = array.splice(oldIndex, 1);
        array.splice(newIndex - 1, 0, obj[0]);
    },
    orderArray: function (array, compare) {
        if (!exports.HyperUtils.isFunction(compare)) {
            return;
        }
        array.sort(function (a, b) {
            return compare(a, b);
        });
    },
    sortArray: function (array, propName, desc) {
        if (exports.HyperUtils.isEmpty(array) || !exports.HyperUtils.isArray(array)) {
            return;
        }
        array.sort(function (a, b) {
            var result = (desc ? 1 : -1) * (a[propName] < b[propName] ? 1 : -1);
            return a[propName] == b[propName] ? 0 : result;
        });
    },
    sortObject: function (obj, desc) {
        var sorted = {}, key, a = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                a.push(key);
            }
        }
        a.sort();
        if (desc) {
            a.reverse();
        }
        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = obj[a[key]];
        }
        return sorted;
    },
    firstOrder: function (map, propName, asc, isDate) {
        var keys = exports.HyperUtils.keysSort(map, 'id', propName, asc, isDate);
        if (exports.HyperUtils.isNotEmpty(keys)) {
            return map[keys[0]];
        }
        return null;
    },
    firstCollection: function (collection) {
        var i;
        for (i in collection) {
            return collection[i];
        }
        return null;
    },
    sortObjMapProperty: function (objMap, propName, asc, isDate) {
        var objMapClone = null;
        var int_asc = 1;
        if (exports.HyperUtils.isNotEmpty(asc)) {
            int_asc = asc;
        }
        var boolean_isDate = false;
        if (exports.HyperUtils.isNotEmpty(isDate)) {
            boolean_isDate = isDate;
        }
        if (exports.HyperUtils.isNotEmpty(objMap)) {
            var arr = [];
            var i;
            for (i in objMap) {
                arr.push({ key: i, obj: objMap[i] });
            }
            var x, y;
            arr.sort(function (a, b) {
                if (exports.HyperUtils.isNotEmpty(propName)) {
                    if (boolean_isDate) {
                        x = Date.parse(a.obj[propName]).getTime();
                        y = Date.parse(b.obj[propName]).getTime();
                    }
                    else {
                        x = a.obj[propName];
                        y = b.obj[propName];
                    }
                }
                else {
                    x = a.obj;
                    y = b.obj;
                }
                return int_asc * (x - y);
            });
            objMapClone = {};
            for (i in arr) {
                objMapClone[arr[i].key] = arr[i].obj;
            }
        }
        return objMapClone;
    },
    keysSort: function (objMap, fieldKey, fieldSort, asc, isDate) {
        var asc_value = 1;
        if (asc == -1) {
            asc_value = -1;
        }
        var objs = [], key;
        for (key in objMap) {
            objs.push(objMap[key]);
        }
        var ai, bi, c;
        objs.sort(function (a, b) {
            if (isDate) {
                ai = Date.parse(a[fieldSort]).getTime();
                bi = Date.parse(b[fieldSort]).getTime();
            }
            else {
                ai = a[fieldSort];
                bi = b[fieldSort];
            }
            c = ai > bi ? 1 : ai < bi ? -1 : 0;
            return c * asc_value;
        });
        var keys = [], i;
        for (i in objs) {
            keys.push(objs[i][fieldKey]);
        }
        return keys;
    },
    filterMap: function (objMap, objFilter) {
        var id;
        var returnVal = {};
        for (id in objMap) {
            if (exports.HyperUtils.filterMatch(objMap[id], objFilter)) {
                returnVal[id] = objMap[id];
            }
        }
        return returnVal;
    },
    getObjFromCollection: function (objs, obj) {
        if (exports.HyperUtils.isEmptyObject(obj)) {
            return null;
        }
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i, j, ok;
            for (i in objs) {
                if (exports.HyperUtils.isNil(objs[i])) {
                    continue;
                }
                ok = true;
                for (j in obj) {
                    if (obj[j] !== objs[i][j]) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    return objs[i];
                }
            }
        }
        return null;
    },
    getObjFromTreeCollection: function (objs, obj) {
        var returnObj = exports.HyperUtils.getObjFromCollection(objs, obj);
        if (returnObj == null) {
            for (i in objs) {
                returnObj = exports.HyperUtils.getObjFromTreeCollection(objs[i].children, obj);
                if (returnObj != null) {
                    break;
                }
            }
        }
        return returnObj;
    },
    searchObjFromTreeCollection: function (objs, obj) {
        var match = false;
        var removeObj = [];
        for (var i = 0; i < objs.length; i++) {
            var matchChild = false;
            if (exports.HyperUtils.isNotEmpty(objs[i].children)) {
                matchChild = exports.HyperUtils.searchObjFromTreeCollection(objs[i].children, obj);
                match = match == true ? true : matchChild;
            }
            var ok = false;
            for (var j in obj) {
                if (objs[i][j].toLowerCase().indexOf(obj[j]) != -1) {
                    ok = true;
                    match = true;
                    break;
                }
            }
            if (!ok && !matchChild) {
                removeObj.push(objs[i].id);
            }
        }
        for (var i = 0; i < removeObj.length; i++) {
            exports.HyperUtils.removeById(objs, removeObj[i]);
        }
        return match;
    },
    getById: function (objs, id) {
        return exports.HyperUtils.getObjFromCollection(objs, { id: id });
    },
    getByHashKey: function (objs, hashKey) {
        return exports.HyperUtils.getObjFromCollection(objs, { $$hashKey: hashKey });
    },
    findCollection: function (objs, objMatch) {
        var returnVal;
        if (exports.HyperUtils.isArray(objs)) {
            returnVal = [];
        }
        else {
            returnVal = {};
        }
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i, j, ok;
            for (i in objs) {
                ok = true;
                for (j in objMatch) {
                    if (exports.HyperUtils.isNil(objs[i]) || objMatch[j] !== objs[i][j]) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    exports.HyperUtils.collectionAdd(returnVal, objs[i]);
                }
            }
        }
        return returnVal;
    },
    findCollectionFieldValueIn: function (objs, fieldName, values) {
        var returnVal;
        if (exports.HyperUtils.isArray(objs)) {
            returnVal = [];
        }
        else {
            returnVal = {};
        }
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                if (exports.HyperUtils.valueIn(objs[i][fieldName], values)) {
                    exports.HyperUtils.collectionAdd(returnVal, objs[i], true);
                }
            }
        }
        return returnVal;
    },
    findCollectionFieldValueNotIn: function (objs, fieldName, values) {
        var returnVal;
        if (exports.HyperUtils.isArray(objs)) {
            returnVal = [];
        }
        else {
            returnVal = {};
        }
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                if (!exports.HyperUtils.valueIn(objs[i][fieldName], values)) {
                    exports.HyperUtils.collectionAdd(returnVal, objs[i], true);
                }
            }
        }
        return returnVal;
    },
    findCollectionQuery: function (collection, queryObject) {
        var returnVal;
        if (exports.HyperUtils.isArray(collection)) {
            returnVal = [];
        }
        else {
            returnVal = {};
        }
        var i, obj;
        for (i in collection) {
            obj = collection[i];
            if (queryObject.match(obj)) {
                exports.HyperUtils.collectionAdd(returnVal, obj);
            }
        }
        return returnVal;
    },
    collectionAdd: function (collection, obj, pushIfExist, addFirst) {
        if (exports.HyperUtils.isNil(collection) || exports.HyperUtils.isNil(obj)) {
            return false;
        }
        if (exports.HyperUtils.isArray(collection)) {
            if (!pushIfExist || collection.indexOf(obj) == -1) {
                if (addFirst) {
                    collection.unshift(obj);
                }
                else {
                    collection.push(obj);
                }
                return true;
            }
        }
        else {
            if (exports.HyperUtils.isEmpty(obj)) {
                return false;
            }
            collection[obj.id] = obj;
            return true;
        }
        return false;
    },
    arrayAdd: function (array, obj, pushIfExist, addFirst) {
        if (exports.HyperUtils.isNil(array)) {
            array = [];
        }
        exports.HyperUtils.collectionAdd(array, obj, pushIfExist, addFirst);
    },
    mapAdd: function (map, obj, pushIfExist) {
        if (exports.HyperUtils.isNil(map)) {
            map = {};
        }
        exports.HyperUtils.collectionAdd(map, obj, pushIfExist);
    },
    collectionAddAll: function (collection, objs, pushIfExist) {
        if (!exports.HyperUtils.isEmpty(objs)) {
            var i;
            for (i in objs) {
                exports.HyperUtils.collectionAdd(collection, objs[i], pushIfExist);
            }
        }
    },
    removeById: function (objs, id) {
        return exports.HyperUtils.removeByField(objs, 'id', id);
    },
    removeByField: function (objs, field, value) {
        if (exports.HyperUtils.isNotEmpty(objs) && objs.length > 0) {
            var i;
            for (i in objs) {
                if (objs[i][field] == value) {
                    objs.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    },
    removeByProperty: function (objs, property, value) {
        if (exports.HyperUtils.isNotEmpty(objs) && objs.length > 0) {
            var i;
            for (i in objs) {
                if (objs[i][property] == value) {
                    objs.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    },
    collectionRemove: function (collection, itemMatch) {
        if (exports.HyperUtils.isNotEmpty(collection)) {
            var key, removeKeyList = [];
            for (key in collection) {
                if (exports.HyperUtils.compareMatch(collection[key], itemMatch)) {
                    removeKeyList.push(key);
                }
            }
            var i;
            if (exports.HyperUtils.isArray(collection)) {
                var d = 0;
                for (i in removeKeyList) {
                    collection.splice(removeKeyList[i] - d, 1);
                    d++;
                }
            }
            else if (exports.HyperUtils.isPlainObject(collection)) {
                for (i in removeKeyList) {
                    delete collection[removeKeyList[i]];
                }
            }
        }
        return collection;
    },
    compareMatch: function (obj1, obj2) {
        // so sanh 1 cap
        if (exports.HyperUtils.isPlainObject(obj1)) {
            var fieldName;
            for (fieldName in obj1) {
                if (exports.HyperUtils.isNotEmpty(obj1[fieldName]) &&
                    exports.HyperUtils.isNotEmpty(obj2[fieldName]) &&
                    !(obj1[fieldName] === obj2[fieldName])) {
                    return false;
                }
            }
            return true;
        }
        else {
            return obj1 === obj2;
        }
    },
    arrayPushFirst: function (collection, value) {
        if (collection.length == 0) {
            collection.push(value);
            return;
        }
        collection.splice(0, 0, value);
    },
    arrayPushRemove: function (array, value) {
        if (exports.HyperUtils.collectionContains(array, value)) {
            exports.HyperUtils.collectionRemove(array, value);
        }
        else {
            if (exports.HyperUtils.isNil(array)) {
                array = [];
            }
            array.push(value);
        }
        return array;
    },
    collectionFindIn: function (collection, values, valueField, isArray) {
        if (exports.HyperUtils.isEmpty(collection) || exports.HyperUtils.isEmpty(values)) {
            if (isArray) {
                return [];
            }
            else {
                return {};
            }
        }
        var _valueField = valueField || 'value', returnItems, i, itrItem;
        if (isArray) {
            returnItems = [];
        }
        else {
            returnItems = {};
        }
        for (i in collection) {
            itrItem = collection[i];
            if (exports.HyperUtils.collectionContains(values, itrItem[_valueField])) {
                if (isArray) {
                    returnItems.push(itrItem);
                }
                else {
                    returnItems[i] = itrItem;
                }
            }
        }
        return returnItems;
    },
    collectionFilterText: function (collection, pattern, textField, isArray) {
        if (exports.HyperUtils.isEmpty(collection)) {
            if (isArray) {
                return [];
            }
            else {
                return {};
            }
        }
        if (exports.HyperUtils.isEmpty(pattern)) {
            return collection;
        }
        var _textField = textField || 'title', returnItems, i, itrItem;
        if (isArray) {
            returnItems = [];
        }
        else {
            returnItems = {};
        }
        var itemValueNoSign, patternNoSign = exports.HyperUtils.toNoSign(pattern).toLowerCase();
        for (i in collection) {
            itrItem = collection[i];
            if (exports.HyperUtils.isNotEmpty(itrItem[_textField])) {
                itemValueNoSign = exports.HyperUtils.toNoSign(itrItem[_textField]).toLowerCase();
                if (itemValueNoSign.indexOf(patternNoSign) != -1) {
                    if (isArray) {
                        returnItems.push(itrItem);
                    }
                    else {
                        returnItems[i] = itrItem;
                    }
                }
            }
        }
        return returnItems;
    },
    arrayToString: function (array, field) {
        if (exports.HyperUtils.isNotEmpty(array)) {
            var result;
            if (exports.HyperUtils.isNotEmpty(field)) {
                result = array[0][field];
            }
            else {
                result = array[0];
            }
            for (var i = 1; i < array.length; i++) {
                if (exports.HyperUtils.isNotEmpty(field)) {
                    result += ',' + array[i][field];
                }
                else {
                    result += ',' + array[i];
                }
            }
            return result;
        }
        else {
            return null;
        }
    },
    arrayToObjectWithId: function (array) {
        var obj = array.length > 0 ? {} : null;
        if (exports.HyperUtils.isNotEmpty(array)) {
            for (var i = 0; i < array.length; i++) {
                if (exports.HyperUtils.isNotNil(array[i].id)) {
                    obj[array[i].id] = array[i];
                }
                else {
                    obj = null;
                    break;
                }
            }
        }
        return obj;
    },
    copyObjectWithIdToArray: function (array, obj) {
        exports.HyperUtils.resetEmpty(array);
        var i;
        for (i in obj) {
            array.push(obj[i]);
        }
    },
    applyReferences: function (objMap, referenceMap, arrayMap, reset, skipIfExist, skipUpdateFields) {
        var i, j;
        for (i in objMap) {
            if (exports.HyperUtils.isEmpty(referenceMap[i])) {
                referenceMap[i] = objMap[i];
            }
            else {
                if (reset) {
                    exports.HyperUtils.resetEmpty(referenceMap[i]);
                }
                if (!skipIfExist) {
                    exports.HyperUtils.copyProperties(objMap[i], referenceMap[i], null, skipUpdateFields);
                }
            }
            if (exports.HyperUtils.isNotEmpty(arrayMap)) {
                for (j in arrayMap) {
                    if (exports.HyperUtils.isEmpty(arrayMap[j][i])) {
                        arrayMap[j][i] = referenceMap[i];
                    }
                }
            }
        }
    },
    findDifferent: function (array1, array2) {
        if (exports.HyperUtils.isEmpty(array1)) {
            return array2;
        }
        if (exports.HyperUtils.isEmpty(array2)) {
            return array1;
        }
        var result = [];
        for (var i = 0; i < array1.length; i++) {
            var index = array2.indexOf(array1[i]);
            if (index > -1) {
                array1.splice(i, 1);
                array2.splice(index, 1);
                i--;
            }
        }
        result = result.concat(array1, array2);
        return result.length == 0 ? null : result;
    },
    applyItemReferences: function (obj, referenceMap, arrayMap, reset, skipIfExist) {
        var objMap = {};
        objMap.id = obj;
        exports.HyperUtils.applyReferences(objMap, referenceMap, arrayMap, reset, skipIfExist);
    },
    deleteItemAllReferences: function (obj, referenceMap, arrayMap) {
        var i;
        for (i in arrayMap) {
            delete arrayMap[i][obj.id];
        }
        delete referenceMap[obj.id];
    },
    pushToMap: function (obj, arrayObj) {
        if (exports.HyperUtils.isEmpty(arrayObj)) {
            return;
        }
        var i, j;
        for (i in arrayObj) {
            if (exports.HyperUtils.isEmpty(arrayObj[i])) {
                arrayObj[i] = {};
            }
            for (j in obj) {
                arrayObj[i][j] = obj[j];
            }
        }
    },
    pushMap: function (obj, map, applyNull, fieldKey) {
        fieldKey = fieldKey || 'id';
        if (exports.HyperUtils.isEmpty(map)) {
            return;
        }
        if (exports.HyperUtils.isNotEmpty(obj)) {
            map[obj[fieldKey]] = obj;
        }
        else if (applyNull) {
            map[obj[fieldKey]] = obj;
        }
    },
    resetPushToMap: function (obj, arrayObj) {
        if (exports.HyperUtils.isEmpty(arrayObj)) {
            return;
        }
        var i, j;
        for (i in arrayObj) {
            exports.HyperUtils.resetEmpty(arrayObj[i]);
            for (j in obj) {
                arrayObj[i][j] = obj[j];
            }
        }
    },
    pushArrayToMap: function (objs, map, key) {
        var i, _key = key || 'id';
        for (i in objs) {
            map[objs[i][_key]] = objs[i];
        }
    },
    resetEmpty: function (collection) {
        if (exports.HyperUtils.isArray(collection)) {
            var i, size = collection.length;
            for (i = 0; i < size; i++) {
                collection.splice(0, 1);
            }
        }
        else {
            var prop;
            for (prop in collection) {
                if (collection.hasOwnProperty(prop)) {
                    delete collection[prop];
                }
            }
        }
    },
    pushItemToMap: function (obj, arrayObj) {
        if (exports.HyperUtils.isEmpty(arrayObj)) {
            return;
        }
        var i, j;
        for (i in arrayObj) {
            if (exports.HyperUtils.isEmpty(arrayObj[i])) {
                arrayObj[i] = {};
            }
            if (exports.HyperUtils.isEmpty(arrayObj[i][obj.id])) {
                arrayObj[i][obj.id] = {};
            }
            for (j in obj) {
                arrayObj[i][obj.id][j] = obj[j];
            }
        }
    },
    putOfMap: function (obj, arrayObj) {
        if (exports.HyperUtils.isEmpty(arrayObj)) {
            return;
        }
        var i;
        for (i in arrayObj) {
            delete arrayObj[i][obj.id];
        }
    },
    map: function (objs, fieldKey, valueKey) {
        var map = {};
        var _fieldKey = fieldKey || 'id';
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                map[objs[i][_fieldKey]] = valueKey ? objs[i][valueKey] : objs[i];
            }
        }
        return map;
    },
    mapTree: function (objs, fieldKey, valueKey) {
        var map = {};
        var _fieldKey = fieldKey || 'id';
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                map[objs[i][_fieldKey]] = valueKey ? objs[i][valueKey] : objs[i];
                if (exports.HyperUtils.isNotEmpty(objs[i].children)) {
                    var objChildren = objs[i].children, j;
                    for (j in objChildren) {
                        map[objChildren[j][_fieldKey]] = valueKey ? objChildren[j][valueKey] : objChildren[j];
                    }
                }
            }
        }
        return map;
    },
    mapList: function (objs, fieldKey) {
        var map = {};
        var _fieldKey = fieldKey || 'id';
        if (exports.HyperUtils.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                if (exports.HyperUtils.isNil(map[objs[i][_fieldKey]])) {
                    map[objs[i][_fieldKey]] = [];
                }
                map[objs[i][_fieldKey]].push(objs[i]);
            }
        }
        return map;
    },
    list: function (objMap, fieldName, distinct) {
        var _fieldName = fieldName || 'id';
        var values, key;
        if (exports.HyperUtils.isNotEmpty(objMap)) {
            values = [];
            for (key in objMap) {
                if (distinct && values.indexOf(objMap[key][_fieldName]) != -1) {
                    continue;
                }
                values.push(objMap[key][_fieldName]);
            }
        }
        return values;
    },
    arrayDistinct: function (array) {
        var i, returnVal = [];
        for (i in array) {
            if (returnVal.indexOf(array[i]) == -1) {
                returnVal.push(array[i]);
            }
        }
        return returnVal;
    },
    newObjIncludeProperties: function (source, skipProperties) {
        var newObj = null;
        if (exports.HyperUtils.isPlainObject(source)) {
            newObj = {};
            exports.HyperUtils.applyChangeProperties(source, newObj, false, skipProperties);
        }
        return newObj;
    },
    applyChangeProperties: function (source, target, applyNull, skipProperties) {
        if (exports.HyperUtils.isPlainObject(source) && exports.HyperUtils.isPlainObject(target)) {
            if (exports.HyperUtils.isEmpty(applyNull)) {
                applyNull = false;
            }
            var field;
            var sourceClone = lodash_1.default.clone(source);
            for (field in sourceClone) {
                if ((exports.HyperUtils.isEmpty(skipProperties) || skipProperties.indexOf(field) == -1) &&
                    (applyNull || exports.HyperUtils.isNotEmpty(sourceClone[field])) &&
                    target[field] != sourceClone[field]) {
                    target[field] = sourceClone[field];
                }
            }
        }
    },
    newInstance: function () {
        var returnVal = {};
        if (exports.HyperUtils.isArray(arguments[0])) {
            returnVal = [];
        }
        var objs = [];
        exports.HyperUtils.collectionAdd(objs, returnVal);
        exports.HyperUtils.collectionAddAll(objs, arguments);
        exports.HyperUtils._extend(true, objs);
        return returnVal;
    },
    _extend: function (deepCopy, objs) {
        var target = objs[0];
        var i;
        for (i = 1; i < objs.length; i++) {
            if (deepCopy) {
                $.extend(true, target, objs[i]);
            }
            else {
                $.extend(target, objs[i]);
            }
        }
    },
    extend: function () {
        exports.HyperUtils._extend(true, arguments);
    },
    extendRefer: function () {
        exports.HyperUtils._extend(false, arguments);
    },
    setDefaultValues: function (target, defaultValue) {
        var defaultValueClone = {};
        $.extend(true, defaultValueClone, defaultValue);
        var i;
        for (i in defaultValueClone) {
            if (exports.HyperUtils.isNotNil(target[i])) {
                delete defaultValueClone[i];
            }
        }
        $.extend(true, target, defaultValueClone);
    },
    setCollection: function (collection, fieldName, value) {
        var i;
        for (i in collection) {
            collection[i][fieldName] = value;
        }
    },
    applyObjToCollection: function (obj, collection, applyNull, fields, skipFields, alwayNotExist, addFirst) {
        var existed = false, dbObj;
        if (!alwayNotExist) {
            var dbObj = exports.HyperUtils.getById(collection, obj.id);
            existed = exports.HyperUtils.isNotNil(dbObj);
        }
        if (existed) {
            exports.HyperUtils.copyProperties(obj, dbObj, fields, skipFields, applyNull);
        }
        else {
            exports.HyperUtils.collectionAdd(collection, obj, false, addFirst);
        }
        return dbObj ? dbObj : obj;
    },
    applyAllToCollection: function (objs, collection, applyNull, fields, skipFields, addFirst) {
        var i;
        if (addFirst) {
            for (i = objs.length - 1; i >= 0; i--) {
                exports.HyperUtils.applyObjToCollection(objs[i], collection, applyNull, fields, skipFields, exports.HyperUtils.isEmpty(collection), true);
            }
        }
        else {
            for (i in objs) {
                exports.HyperUtils.applyObjToCollection(objs[i], collection, applyNull, fields, skipFields, exports.HyperUtils.isEmpty(collection), true);
            }
        }
    },
    copyProperties: function (source, target, fields, skipFields, applyNull) {
        if (exports.HyperUtils.isPlainObject(source) && exports.HyperUtils.isPlainObject(target)) {
            if (exports.HyperUtils.isEmpty(applyNull)) {
                applyNull = false;
            }
            var fieldList, i;
            if (exports.HyperUtils.isEmpty(fields) || fields.length == 0) {
                fieldList = Object.keys(source);
            }
            else {
                fieldList = fields;
            }
            if (exports.HyperUtils.isNotEmpty(skipFields)) {
                for (i in skipFields) {
                    exports.HyperUtils.collectionRemove(fieldList, skipFields[i]);
                }
            }
            for (i in fieldList) {
                if (applyNull || exports.HyperUtils.isNotNil(source[fieldList[i]])) {
                    if (exports.HyperUtils.isPlainObject(source[fieldList[i]])) {
                        if (exports.HyperUtils.isEmpty(target[fieldList[i]])) {
                            if (source[fieldList[i]] instanceof Array) {
                                target[fieldList[i]] = [];
                            }
                            else {
                                target[fieldList[i]] = {};
                            }
                        }
                        $.extend(true, target[fieldList[i]], source[fieldList[i]]);
                    }
                    else if (exports.HyperUtils.isArray(source[fieldList[i]])) {
                        target[fieldList[i]] = target[fieldList[i]] || [];
                        var sourceObj = exports.HyperUtils.arrayToObjectWithId(source[fieldList[i]]);
                        var targetObj = exports.HyperUtils.arrayToObjectWithId(target[fieldList[i]]);
                        if (sourceObj == null || targetObj == null) {
                            target[fieldList[i]] = source[fieldList[i]];
                        }
                        else {
                            var j;
                            for (j in sourceObj) {
                                if (targetObj[j] == null) {
                                    targetObj[j] = {};
                                }
                                this.copyProperties(sourceObj[j], targetObj[j]);
                            }
                            for (j in targetObj) {
                                if (sourceObj[j] == null) {
                                    delete targetObj[j];
                                }
                            }
                            exports.HyperUtils.copyObjectWithIdToArray(target[fieldList[i]], targetObj);
                            if (exports.HyperUtils.isNotEmpty(target[fieldList[i]]) &&
                                exports.HyperUtils.isNotEmpty(target[fieldList[i]][0].priority)) {
                                exports.HyperUtils.sortArray(target[fieldList[i]], 'priority');
                            }
                        }
                    }
                    else {
                        target[fieldList[i]] = source[fieldList[i]];
                    }
                }
            }
        }
    },
    getProperty: function (source, propertySelect) {
        if (exports.HyperUtils.isEmpty(source) || exports.HyperUtils.isEmpty(propertySelect)) {
            return null;
        }
        var properties = propertySelect.split('.'), i, property, objItr;
        objItr = source;
        for (i in properties) {
            property = properties[i];
            objItr = objItr[property];
            if (exports.HyperUtils.isEmpty(objItr)) {
                return objItr;
            }
        }
        return objItr;
    },
    split: function (s, delim) {
        if (exports.HyperUtils.isEmpty(s)) {
            return [];
        }
        if (exports.HyperUtils.isEmpty(delim)) {
            delim = exports.HyperUtils.STR_COMMA;
        }
        s = s.trim();
        var sn = s.split(delim);
        var i;
        for (i = 0; i < sn.length; i++) {
            sn[i] = sn[i].trim();
        }
        return sn;
    },
    clone: function (obj) {
        if (!exports.HyperUtils.isObject(obj)) {
            return obj;
        }
        if (exports.HyperUtils.isNotEmpty(obj)) {
            return exports.HyperUtils.newInstance(obj, {});
        }
        return null;
    },
    validateFile: function (file, fileSize) {
        if (exports.HyperUtils.isNil(fileSize)) {
            fileSize = this.GOAL_ATTACH_SIZE;
        }
        if (exports.HyperUtils.isNotEmpty(file)) {
            if (file.size > fileSize * 1024 * 1024) {
                JCommonUtil.alertError({
                    message: JCommonUtil.message('error.file.size.too.max', 'error', [file.name, fileSize]),
                });
                return false;
            }
        }
        return true;
    },
    mapToArray: function (map) {
        var returnVal = [], i;
        if (exports.HyperUtils.isPlainObject(map) && !exports.HyperUtils.isEmptyObject(map)) {
            for (i in map) {
                returnVal.push(map[i]);
            }
        }
        return returnVal;
    },
    isString: function (func) {
        return typeof func === exports.HyperUtils.TYPE_STRING;
    },
    isObject: function (obj) {
        return typeof obj === exports.HyperUtils.TYPE_OBJECT;
    },
    isPlainObject: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },
    isDbObject: function (obj) {
        return exports.HyperUtils.isPlainObject(obj) && exports.HyperUtils.isNotNil(obj.id);
    },
    isArray: function (obj) {
        return Array.isArray(obj);
    },
    isFunction: function (func) {
        return typeof func === exports.HyperUtils.TYPE_FUNCTION;
    },
    isEmptyObject: function (obj) {
        return exports.HyperUtils.isEmpty(obj) || Object.keys(obj).length === 0;
    },
    isImage: function (contentType) {
        if (exports.HyperUtils.isEmpty(contentType)) {
            return false;
        }
        return contentType.indexOf('image/') != -1;
    },
    getFileType: function (file) {
        if (exports.HyperUtils.valueIn(file.fileExtension, ['xls', 'xlsx'])) {
            return 'fa-file-excel-o fa-file-excel';
        }
        if (exports.HyperUtils.valueIn(file.fileExtension, ['doc', 'docx'])) {
            return 'fa-file-word-o fa-file-word';
        }
        if (exports.HyperUtils.valueIn(file.fileExtension, ['ppt', 'pptx'])) {
            return 'fa-file-powerpoint-o fa-file-powerpoint';
        }
        /*if (HyperUtils.valueIn(fileExtension, ['vsd', 'vsdx'])) {
             return 'fa-file-visio-o';
             }*/
        if (file.fileExtension == 'pdf') {
            return 'fa-file-pdf-o fa-file-pdf';
        }
        /*if (file.fileExtension == 'rar') {
             return 'fa-file-archive';
             }
             if (HyperUtils.valueIn(file.fileExtension, ['zip', '7z', 'gz'])) {
             return 'fa-file-zip';
             }*/
        if (exports.HyperUtils.valueIn(file.fileExtension, ['rar', 'zip', '7z', 'gz'])) {
            return 'fa-file-archive-o fa-file-archive';
        }
        if (exports.HyperUtils.valueIn(file.fileExtension, ['c', 'java', 'php', 'h', 'html', 'htm', 'js'])) {
            return 'fa-file-code-o fa-file-code';
        }
        if (file.fileExtension == 'external') {
            return 'fa-external-link-alt';
        }
        if (file.contentType.indexOf('image/') != -1) {
            return 'fa-file-image-o fa-file-image';
        }
        if (file.contentType.indexOf('audio/') != -1) {
            return 'fa-file-audio-o fa-file-audio';
        }
        if (file.contentType.indexOf('video/') != -1) {
            return 'fa-file-video-o fa-file-video';
        }
        if (file.contentType.indexOf('text/') != -1) {
            return 'fa-file-alt';
        }
        return 'fa-file-o fa-file';
    },
    parseJson: function (value) {
        if (exports.HyperUtils.isEmpty(value)) {
            return null;
        }
        return JCommonUtil.JSONparse(value);
    },
    getPaginated: function (dataLength, pageSize) {
        var page = 0;
        if (pageSize == 0) {
            pageSize = 20;
        }
        if (dataLength < pageSize) {
            page = 1;
        }
        else {
            page = Math.ceil(dataLength / pageSize) + 1;
        }
        return {
            page: page,
            pageSize: pageSize,
            maxRow: null,
            startRow: dataLength,
        };
    },
    ltInteger: function (a, b) {
        if (parseInt(a) < parseInt(b)) {
            return true;
        }
        else {
            return false;
        }
    },
    eqInteger: function (a, b) {
        if (parseInt(a) == parseInt(b)) {
            return true;
        }
        else {
            return false;
        }
    },
    getFbTime: function (datetime, serverDate) {
        //        var separator = " ";
        //        var dCh = "/";
        //        var tCh = ":";
        //
        //        // tach date va time
        //        var pos = datetime.indexOf(separator);
        //
        //        // check tung phan
        //        var date = datetime.substring(0, pos);
        //        var time = datetime.substring(pos + 1);
        //        if (!isDate(date) || !isTime(time)) {
        //            throw new Error("Invalid date or time");
        //        }
        //
        //        // tach tung phan cua date:
        //        var pos1 = date.indexOf(dCh);
        //        var pos2 = date.indexOf(dCh, pos1 + 1);
        //        var day_str = date.substring(0, pos1);
        //        var month_str = date.substring(pos1 + 1, pos2);
        //        var year_str = date.substring(pos2 + 1);
        //
        //        var day_int = parseInt(day_str);
        //        var month_int = parseInt(month_str);
        //        var year_int = parseInt(year_str);
        //
        //        // tach tung phan cua time:
        //        pos1 = time.indexOf(tCh);
        //        pos2 = time.indexOf(tCh, pos1 + 1);
        //        var hour_str = time.substring(0, pos1);
        //        var minute_str = time.substring(pos1 + 1, pos2);
        //        var second_str = time.substring(pos2 + 1);
        //
        //        var hour_int = parseInt(hour_str);
        //        var minute_int = parseInt(minute_str);
        //        var second_int = parseInt(second_str);
        //        var now;
        //        if (!serverDate) {
        //            now = new Date();
        //        } else {
        //            serverDate = parseInt(serverDate) || 0;
        //            if (serverDate == 0) {
        //                now = new Date();
        //            } else {
        //                now = new Date(serverDate);
        //            }
        //        }
        //        var day_now_int = now.getDate();
        //        var month_now_int = now.getMonth() + 1;
        //        var year_now_int = now.getFullYear();
        //        var hour_now_int = now.getHours();
        //        var minute_now_int = now.getMinutes();
        //        var second_now_int = now.getSeconds();
        //        var d1 = new Date(year_int, month_int - 1, day_int, hour_int, minute_int, second_int);
        //        var d2 = new Date(year_now_int, month_now_int - 1, day_now_int, hour_now_int, minute_now_int, second_now_int);
        //        var delta = 0;
        //        var txt = "";
        //        var oneSecond = 1000;
        //        var oneMinute = 1000 * 60;
        //        var oneHour = 1000 * 60 * 60;
        //        var oneDay = 1000 * 60 * 60 * 24;
        //        delta = d2.getTime() - d1.getTime();
        //        var diffSecond = Math.abs(delta / oneSecond);
        //        var diffMinute = Math.abs(Math.floor(delta / oneMinute));
        //        var diffHour = Math.abs(Math.floor(delta / oneHour));
        //        var diffDay = Math.abs(Math.floor(delta / oneDay));
        var txt = '';
        var date = new Date(datetime);
        var dateServer = new Date(serverDate);
        var diff = serverDate - datetime;
        var diffSecond = Math.floor(diff / 1000);
        var diffMinute = Math.floor(diffSecond / 60);
        var diffHour = Math.floor(diffMinute / 60);
        if (diffSecond < 60) {
            // vai giay truoc
            txt = $.language.getMessage('ihcm.goal.feedback.time.some.second', null);
            return txt;
        }
        else if (diffSecond >= 60 && diffSecond < 120) {
            // 2 * 60
            // khoang mot phut truoc
            txt = $.language.getMessage('ihcm.goal.feedback.time.some.minute', null);
            return txt;
        }
        else if (diffSecond >= 120 && diffSecond < 3600) {
            // 60 * 60
            // xxx phut truoc
            txt = $.language.getMessage('ihcm.goal.feedback.time.minute', diffMinute);
            return txt;
        }
        else if (diffSecond >= 3600 && diffSecond < 7200) {
            // 2 * 60 * 60
            // vai gio truoc
            txt = $.language.getMessage('ihcm.goal.feedback.time.some.hour', null);
            return txt;
        }
        else if (diffSecond >= 7200 &&
            dateServer.getDate() == date.getDate() &&
            dateServer.getMonth() == date.getMonth() &&
            dateServer.getFullYear() == date.getFullYear()) {
            // 60 * 60 * 24
            // xxx gio truoc
            txt = $.language.getMessage('ihcm.goal.feedback.time.hour', diffHour);
            return txt;
        }
        else if (diffSecond >= 7200 &&
            dateServer.getDate() - date.getDate() == 1 &&
            dateServer.getMonth() == date.getMonth() &&
            dateServer.getFullYear() == date.getFullYear()) {
            // 2 * 60 * 60 * 24
            // hom qua luc xxx
            txt = $.language.getMessage('ihcm.goal.feedback.time.yesterday', [
                date.getHours(),
                date.getMinutes(),
            ]);
            return txt;
        }
        else {
            if (date.getYear() == dateServer.getYear()) {
                // trong nam
                txt = $.language.getMessage('ihcm.goal.feedback.time.some.date', [
                    date.getDate(),
                    date.getMonth() + 1,
                    date.getHours(),
                    date.getMinutes(),
                ]);
                return txt;
            }
            else if (date.getYear() < dateServer.getYear()) {
                // nam moi
                txt = $.language.getMessage('ihcm.goal.feedback.time.some.date.year', [
                    date.getDate(),
                    date.getMonth() + 1,
                    date.getFullYear(),
                    date.getHours(),
                    date.getMinutes(),
                ]);
                return txt;
            }
            else {
                txt = $.language.getMessage('ihcm.goal.feedback.time.some.date.year', [
                    date.getDate(),
                    date.getMonth() + 1,
                    date.getFullYear(),
                    date.getHours(),
                    date.getMinutes(),
                ]);
            }
        }
        return null;
    },
    printCaseString: function () {
        var i;
        for (i in arguments) {
            if (exports.HyperUtils.isNotEmpty(arguments[i])) {
                return arguments[i];
            }
        }
        return null;
    },
    toNoSign: function (value) {
        if (value == '') {
            return '';
        }
        var str = value;
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        str = str.replace(/Đ/g, 'D');
        return str;
    },
    cloneJson: function (obj) {
        return JSON.parse(JSON.stringify(ob));
    },
    updateState: function (state, options) {
        var newState = lodash_1.default.clone(state) || {};
        if (exports.HyperUtils.isNotEmpty(options.reload) && options.reload) {
            exports.HyperUtils.resetEmpty(newState);
        }
        if (exports.HyperUtils.isNotNil(options.data)) {
            if (exports.HyperUtils.isArray(options.data)) {
                for (var i = 0; i < options.data.length; i++) {
                    exports.HyperUtils.applyObjToCollection(options.data[i], newState, true, null, options.skipUpdateFields, false, false);
                }
            }
            else {
                if (exports.HyperUtils.isNotEmpty(options.triggers) && options.triggers.indexOf('delete') != -1) {
                    exports.HyperUtils.collectionRemove(newState, { id: options.data.id });
                }
                else {
                    if (exports.HyperUtils.isDbObject(options.data)) {
                        var obj = exports.HyperUtils.getById(newState, options.data.id);
                        exports.HyperUtils.applyObjToCollection(options.data, newState, true, null, options.skipUpdateFields, false, options.addFirst);
                    }
                }
            }
        }
        return newState;
    },
    applyDataSet: function (state, options) {
        var newState = lodash_1.default.clone(state) || {};
        if (exports.HyperUtils.isNotEmpty(options.reload) && options.reload) {
            exports.HyperUtils.resetEmpty(newState.dataSet);
        }
        newState.isChangeViews = options.isChangeViews;
        if (exports.HyperUtils.isNotNil(options.data)) {
            newState.actionTrigger = options.actionTrigger;
            if (exports.HyperUtils.isArray(options.data)) {
                for (var i = 0; i < options.data.length; i++) {
                    exports.HyperUtils.applyObjToCollection(options.data[i], newState.dataSet, true, null, options.skipUpdateFields, false, false);
                }
            }
            else {
                if (exports.HyperUtils.isNotEmpty(options.triggers) && options.triggers.indexOf('delete') != -1) {
                    exports.HyperUtils.collectionRemove(newState.dataSet, {
                        id: options.data.id,
                    });
                }
                else {
                    if (exports.HyperUtils.isDbObject(options.data)) {
                        var obj = exports.HyperUtils.getById(newState.dataSet, options.data.id);
                        exports.HyperUtils.applyObjToCollection(options.data, newState.dataSet, true, null, options.skipUpdateFields, false, options.addFirst);
                    }
                }
            }
        }
        return newState;
    },
    handleResAfterUpdateStore: function (responseHandlers, res) {
        if (exports.HyperUtils.isNotEmpty(responseHandlers)) {
            for (var keyAction in responseHandlers) {
                if (responseHandlers.hasOwnProperty(keyAction) &&
                    keyAction.toString() == res.actionTrigger.toString()) {
                    if (exports.HyperUtils.isFunction(responseHandlers[keyAction].onApplyData)) {
                        responseHandlers[keyAction].onApplyData(responseHandlers[keyAction].objData);
                    }
                    if (exports.HyperUtils.isFunction(responseHandlers[keyAction].onEndDataApply)) {
                        setTimeout(function () {
                            responseHandlers[keyAction].onEndDataApply(responseHandlers[keyAction].objData);
                            delete responseHandlers[keyAction];
                        }, 100);
                    }
                    else {
                        delete responseHandlers[keyAction];
                    }
                }
            }
        }
    },
    //
    capitalFirstCharacter: function (text) {
        var _a;
        return ((_a = text === null || text === void 0 ? void 0 : text.charAt(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || '';
    },
};
