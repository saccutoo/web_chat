// @ts-nocheck
// import { JCommonUtil } from "./hyd-common-utils";

export let $bean = {
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
    //
    RIGHT_CLICK_CODE: [2, 3], // 2: IE; 3: Gecko (Firefox), WebKit (Safari/Chrome) & Opera
    //
    STR_COMMA: ',',
    STR_DOT: '.',
    STR_SPACE: ' ',
    MSG_BUNDLES: ['common', 'schedule', 'tempmsg', 'security', 'error', 'help', 'ihcm', 'tip', 'crm', 'rap'],
    //
    AVG_TIME_TEMPLATE_RENDER: 300,
    FAST_TIME_RENDER: 10,
    //
    // slint:disable:no-var-requires
    isEmpty: function (value) {
        return ((value == undefined) || (value == null) || (value.length == 0) || (value == "null") || (value == "undefined")) || ($bean.isPlainObject(value) && Object.keys(value).length == 0);
    },
    isNotEmpty: function (value) {
        return !$bean.isEmpty(value);
    },
    isNil: function (value) {
        return value === undefined || value === null;
    },
    isNotNil: function (value) {
        return !$bean.isNil(value);
    },
    isBoNil: function (bo) {
        return $bean.isNil(bo) || $bean.isNil(bo.id);
    },
    isBoNotNil: function (bo) {
        return !$bean.isBoNil(bo);
    },
    isTrue: function (value) {
        return true == value || "true" == value;
    },
    isFalse: function (value) {
        return !$bean.isTrue(value);
    },
    encodeObject: (value) => {
        return encodeURIComponent(JSON.stringify(value));
    },

    decodeObject: (value) => {

    },

    CHAR_POSSIBLE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

    genRandomID: function (length) {
        if ($bean.isEmpty(length)) {
            length = 5;
        }
        var text = "";
        for (var i = 0; i < length; i++) {
            text += $bean.CHAR_POSSIBLE.charAt(Math.floor(Math.random() * $bean.CHAR_POSSIBLE.length));
        }
        return text;
    },

    getJson: (value) => {
        return JSON.stringify(value);
    },
    executeVal:

        function (value, params) {
            if ($bean.isFunction(value)) {
                return value(params);
            } else {
                return value;
            }
        }

    ,
    val: function (text) {
        try {
            var returnVal = eval(text);
            return returnVal;
        } catch (e) {
            return null;
        }
    }
    ,
    valueIn: function (value, collection) {
        if ($bean.isEmpty(collection)) {
            return false;
        }
        if ($bean.isArray(collection)) {
            return collection.indexOf(value) != -1;
        } else {
            return $bean.isNotEmpty(collection[value]);
        }
        return false;
    }
    ,
    valueListIn: function (values, collection) {
        if ($bean.isEmpty(values) || $bean.isEmpty(collection)) {
            return false;
        }
        var i;
        for (i in values) {
            if (!$bean.valueIn(values[i], collection)) {
                return false;
            }
        }
        return true;
    }
    ,
    collectionContains: function (collection, value) {
        return $bean.valueIn(value, collection);
    }
    ,
    collectionContainsOne: function (collection, values) {
        if ($bean.isEmpty(collection) || $bean.isEmpty(values)) {
            return false;
        }
        var i;
        for (i in values) {
            if ($bean.valueIn(values[i], collection)) {
                return true;
            }
        }
        return false;
    }
    ,
    getRequestAjaxByUrl: function (url) {
        return url;
    }
    ,
    getRequestByUrl: function (url) {
        return url;
    }
    ,
    toFormDataByBean: function (bean) {
        var formObj = { bean: bean }
        return $bean.toFormDataByForm(formObj);
    }
    ,
    toFormDataByForm: function (formObj) {
        var form = formObj;
        if ($bean.isEmptyObject(form)) {
            return null;
        }
        if ($bean.isEmptyObject(form.bean)) {
            delete form.bean;
        }
        return $.param($bean.getRequestFormData(form), true);
    }
    ,
    toFormData: function (requestForm) {
        return $.param(requestForm, true);
    }
    ,
    getRequestFormData: function (data) {
        var result = {};

        function process(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                result[prop] = cur;
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    process(cur[p], prop ? prop + '.' + p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }

        process(data, '');
        return result;
    }
    ,
    checkUpdateField: function (bo, dbBo, fieldName, applyNull) {
        if (!applyNull && $bean.isEmpty(bo[fieldName])) {
            return false;
        }
        return bo[fieldName] != dbBo[fieldName];
    }
    ,
    settingUpdateFields: function (bo, dbBo, updateFieldNames, fieldNames, applyAllNull, removeNotApplyField) {
        var i;
        for (i in fieldNames) {
            if ($bean.BeanUtil.checkUpdateField(bo, dbBo, fieldNames[i], applyAllNull)) {
                updateFieldNames.push(fieldNames[i]);
            } else {
                $bean.collectionRemove(updateFieldNames, fieldNames[i]);
                if (removeNotApplyField) {
                    delete bo[fieldNames[i]];
                }
            }
        }
    }
    ,
    validateUpdateField: function (bo, updateFieldNames, fieldName, condition) {
        if (condition) {
            if ($bean.isNotEmpty(bo[fieldName]) && updateFieldNames.indexOf(fieldName) == -1) {
                updateFieldNames.push(fieldName);
            }
        } else {
            $bean.collectionRemove(updateFieldNames, fieldName);
            delete bo[fieldName];
        }
    }
    ,
    applyUpdateField: function (obj, updateFields, fieldName, newValue, oldValue, applyNull) {
        if (!$bean.compare(newValue, oldValue) && (applyNull || $bean.isNotEmpty(newValue))) {
            obj[fieldName] = newValue;
            updateFields.push(fieldName);
        } else {
            $bean.collectionRemove(updateFields, fieldName);
        }
    }
    ,
    compare: function (obj1, obj2) {
        if ($bean.isEmpty(obj1) && $bean.isEmpty(obj2)) {
            return true;
        }
        if ($bean.isEmpty(obj1) || $bean.isEmpty(obj2)) {
            return false;
        }
        return JSON.stringify(obj1) == JSON.stringify(obj2);
    }
    ,
    compareCollection: function (col1, col2) {
        if ($bean.isEmpty(col1) && $bean.isEmpty(col2)) {
            return true;
        }
        if ($bean.isEmpty(col1) || $bean.isEmpty(col2)) {
            return false;
        }
        if (col1.length != col2.length) {
            return false;
        }
        /*Todo: Can them cho cac truong hop khac primitive*/
        var i;
        for (i in col1) {
            if (!$bean.valueIn(col1[i], col2)) {
                return false;
            }
        }
        for (i in col2) {
            if (!$bean.valueIn(col2[i], col1)) {
                return false;
            }
        }
        return true;
    }
    ,
    compareDateString: function (sdate1, sdate2) {
        var date1 = JDateUtil.getDateFormat(sdate1, JDateUtil.FORMAT_DATE_TIME_JSON);
        var date2 = JDateUtil.getDateFormat(sdate2, JDateUtil.FORMAT_DATE_TIME_JSON);
        if ($bean.isEmpty(date1) && $bean.isEmpty(date2)) {
            return 0;
        }
        if ($bean.isEmpty(date1) || $bean.isEmpty(date2)) {
            return $bean.isEmpty(date1) ? -1 : 1;
        }
        return date1.getTime() - date2.getTime();
    }
    ,
    getUrlParam: function (paramName) {
        paramName = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + paramName + "=([^&#]*)"), results = regex.exec(window.location.search);
        return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    ,
    concatArray: function (a, b, fieldKey) {
        var returnVal = [];
        var keys = [];
        var i;
        var x = b.concat(a);
        for (i in x) {
            if ($bean.isEmpty(fieldKey) || keys.indexOf(x[i][fieldKey]) == -1) {
                returnVal.push(x[i]);
            }
            if ($bean.isNotEmpty(fieldKey)) {
                if (keys.indexOf(x[i][fieldKey]) == -1) {
                    keys.push(x[i][fieldKey]);
                }
            }
        }
        return returnVal;
    }
    ,
    equalInputVal: function (source, target) {
        if ($bean.isEmpty(source) && $bean.isEmpty(target)) {
            return true;
        }
        return source == target;
    }
    ,
    orAll: function (arrayInt) {
        if ($bean.isNotEmpty(arrayInt)) {
            var i, returnVal = 0;
            for (i in arrayInt) {
                returnVal = returnVal | arrayInt[i];
            }
            return returnVal;
        }
        return 0;
    }
    ,
    countCollection: function (collection) {
        if ($bean.isEmpty(collection)) {
            return 0;
        }
        if ($bean.isArray(collection)) {
            return collection.length;
        } else {
            return Object.keys(collection).length;
        }
        return null;
    }
    ,
    arrayChangeItemPosition: function (array, oldIndex, newIndex) {
        if ($bean.isEmpty(array)) {
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
    }
    ,
    orderArray: function (array, compare) {
        if (!$bean.isFunction(compare)) {
            return;
        }
        array.sort(function (a, b) {
            return compare(a, b);
        });
    }
    ,
    sortArray: function (array, propName, desc) {
        if ($bean.isEmpty(array) || !$bean.isArray(array)) {
            return;
        }
        array.sort(function (a, b) {
            var result = (desc ? 1 : -1) * (a[propName] < b[propName] ? 1 : -1);
            return a[propName] == b[propName] ? 0 : result;
        });
    }
    ,
    sortObject: function (obj, desc) {
        var sorted = {},
            key, a = [];

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
    }
    ,
    firstOrder: function (map, propName, asc, isDate) {
        var keys = $bean.keysSort(map, 'id', propName, asc, isDate);
        if ($bean.isNotEmpty(keys)) {
            return map[keys[0]];
        }
        return null;
    }
    ,
    firstCollection: function (collection) {
        var i;
        for (i in collection) {
            return collection[i];
        }
        return null;
    }
    ,
    sortObjMapProperty: function (objMap, propName, asc, isDate) {
        var objMapClone = null;
        var int_asc = 1;
        if ($bean.isNotEmpty(asc)) {
            int_asc = asc;
        }
        var boolean_isDate = false;
        if ($bean.isNotEmpty(isDate)) {
            boolean_isDate = isDate;
        }
        if ($bean.isNotEmpty(objMap)) {
            var arr = [];
            var i;
            for (i in objMap) {
                arr.push({ 'key': i, 'obj': objMap[i] });
            }
            var x, y;
            arr.sort(function (a, b) {
                if ($bean.isNotEmpty(propName)) {
                    if (boolean_isDate) {
                        x = Date.parse(a['obj'][propName]).getTime();
                        y = Date.parse(b['obj'][propName]).getTime();
                    } else {
                        x = a['obj'][propName];
                        y = b['obj'][propName];
                    }
                } else {
                    x = a['obj'];
                    y = b['obj'];
                }
                return int_asc * (x - y);
            });
            objMapClone = {};
            for (i in arr) {
                objMapClone[arr[i]['key']] = arr[i]['obj'];
            }
        }
        return objMapClone;
    }
    ,
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
            } else {
                ai = a[fieldSort];
                bi = b[fieldSort];
            }
            c = ai > bi ? 1 : (ai < bi ? -1 : 0)
            return c * asc_value;
        });
        var keys = [], i;
        for (i in objs) {
            keys.push(objs[i][fieldKey]);
        }
        return keys;
    }
    ,
    filterMap: function (objMap, objFilter) {
        var id;
        var returnVal = {};
        for (id in objMap) {
            if ($bean.filterMatch(objMap[id], objFilter)) {
                returnVal[id] = objMap[id];
            }
        }
        return returnVal;
    }
    ,
    filterMatch: function (obj, objFilter) {
        if ($bean.isEmptyObject(objFilter)) {
            return false;
        }
        if ($bean.isEmptyObject(obj)) {
            return false;
        }
        var field;
        for (field in objFilter) {
            fieldValue = obj[field];
            fieldFilterValue = objFilter[field];
            if (obj[field] != objFilter[field]) {
                return false;
            }
        }
        return true;
    }
    ,
    getObjFromCollection: function (objs, obj) {
        if ($bean.isEmptyObject(obj)) {
            return null;
        }
        if ($bean.isNotEmpty(objs)) {
            var i, j, ok;
            for (i in objs) {
                if ($bean.isNil(objs[i])) {
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
    }
    ,
    getObjFromTreeCollection: function (objs, obj) {
        var returnObj = $bean.getObjFromCollection(objs, obj);
        if (returnObj == null) {
            for (i in objs) {
                returnObj = $bean.getObjFromTreeCollection(objs[i].children, obj);
                if (returnObj != null) {
                    break;
                }
            }
        }
        return returnObj;
    }
    ,
    searchObjFromTreeCollection: function (objs, obj) {
        var match = false;
        var removeObj = [];
        for (var i = 0; i < objs.length; i++) {
            var matchChild = false;
            if ($bean.isNotEmpty(objs[i].children)) {
                matchChild = $bean.searchObjFromTreeCollection(objs[i].children, obj);
                match = match == true ? true : matchChild;
            }
            var ok = false;
            for (j in obj) {
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
            $bean.removeById(objs, removeObj[i]);
        }
        return match;
    }
    ,
    getById: function (objs, id) {
        return $bean.getObjFromCollection(objs, { id: id });
    }
    ,
    getByHashKey: function (objs, hashKey) {
        return $bean.getObjFromCollection(objs, { '$$hashKey': hashKey });
    }
    ,
    findCollection: function (objs, objMatch) {
        var returnVal;
        if ($bean.isArray(objs)) {
            returnVal = [];
        } else {
            returnVal = {};
        }
        if ($bean.isNotEmpty(objs)) {
            var i, j, ok;
            for (i in objs) {
                ok = true;
                for (j in objMatch) {
                    if ($bean.isNil(objs[i]) || objMatch[j] !== objs[i][j]) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    $bean.collectionAdd(returnVal, objs[i]);
                }
            }
        }
        return returnVal;
    }
    ,
    findCollectionFieldValueIn: function (objs, fieldName, values) {
        var returnVal;
        if ($bean.isArray(objs)) {
            returnVal = [];
        } else {
            returnVal = {};
        }
        if ($bean.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                if ($bean.valueIn(objs[i][fieldName], values)) {
                    $bean.collectionAdd(returnVal, objs[i], true);
                }
            }
        }
        return returnVal;
    }
    ,
    findCollectionFieldValueNotIn: function (objs, fieldName, values) {
        var returnVal;
        if ($bean.isArray(objs)) {
            returnVal = [];
        } else {
            returnVal = {};
        }
        if ($bean.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                if (!$bean.valueIn(objs[i][fieldName], values)) {
                    $bean.collectionAdd(returnVal, objs[i], true);
                }
            }
        }
        return returnVal;
    }
    ,
    findCollectionQuery: function (collection, queryObject) {
        var returnVal;
        if ($bean.isArray(collection)) {
            returnVal = [];
        } else {
            returnVal = {};
        }
        var i, obj;
        for (i in collection) {
            obj = collection[i];
            if (queryObject.match(obj)) {
                $bean.collectionAdd(returnVal, obj);
            }
        }
        return returnVal;
    }
    ,
    collectionAdd: function (collection, obj, pushIfExist, addFirst) {
        if ($bean.isNil(collection) || $bean.isNil(obj)) {
            return false;
        }
        if ($bean.isArray(collection)) {
            if (!pushIfExist || collection.indexOf(obj) == -1) {
                if (addFirst) {
                    collection.unshift(obj);
                } else {
                    collection.push(obj);
                }
                return true;
            }
        } else {
            if ($bean.isEmpty(obj)) {
                return false;
            }
            collection[obj.id] = obj;
            return true;
        }
        return false;
    }
    ,
    arrayAdd: function (array, obj, pushIfExist, addFirst) {
        if ($bean.isNil(array)) {
            array = [];
        }
        $bean.collectionAdd(array, obj, pushIfExist, addFirst);
    }
    ,
    mapAdd: function (map, obj, pushIfExist) {
        if ($bean.isNil(map)) {
            map = {};
        }
        $bean.collectionAdd(map, obj, pushIfExist);
    }
    ,
    collectionAddAll: function (collection, objs, pushIfExist) {
        if (!$bean.isEmpty(objs)) {
            var i;
            for (i in objs) {
                $bean.collectionAdd(collection, objs[i], pushIfExist);
            }
        }
    }
    ,
    removeById: function (objs, id) {
        if ($bean.isNotEmpty(objs) && objs.length > 0) {
            var i;
            for (i in objs) {
                if (objs[i].id == id) {
                    objs.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
    ,
    collectionRemove: function (collection, itemMatch) {
        if ($bean.isNotEmpty(collection)) {
            var key, removeKeyList = [];
            for (key in collection) {
                if ($bean.compareMatch(collection[key], itemMatch)) {
                    removeKeyList.push(key);
                }
            }
            var i;
            if ($bean.isArray(collection)) {
                var d = 0;
                for (i in removeKeyList) {
                    collection.splice(removeKeyList[i] - d, 1);
                    d++;
                }
            } else if ($bean.isPlainObject(collection)) {
                for (i in removeKeyList) {
                    delete collection[removeKeyList[i]];
                }
            }
        }
        return collection;
    }
    ,
    compareMatch: function (obj1, obj2) {
        // so sanh 1 cap
        if ($bean.isPlainObject(obj1)) {
            var fieldName;
            for (fieldName in obj1) {
                if ($bean.isNotEmpty(obj1[fieldName])
                    && $bean.isNotEmpty(obj2[fieldName])
                    && !(obj1[fieldName] === obj2[fieldName])) {
                    return false;
                }
            }
            return true;
        } else {
            return obj1 === obj2;
        }
    }
    ,
    arrayPushFirst: function (collection, value) {
        if (collection.length == 0) {
            collection.push(value);
            return
        }
        collection.splice(0, 0, value);
    }
    ,
    arrayPushRemove: function (array, value) {
        if ($bean.collectionContains(array, value)) {
            $bean.collectionRemove(array, value);
        } else {
            if ($bean.isNil(array)) {
                array = [];
            }
            array.push(value);
        }
        return array;
    }
    ,
    collectionFindIn: function (collection, values, valueField, isArray) {
        if ($bean.isEmpty(collection) || $bean.isEmpty(values)) {
            if (isArray) {
                return [];
            } else {
                return {};
            }
        }
        var _valueField = valueField || 'value', returnItems, i, itrItem;
        if (isArray) {
            returnItems = [];
        } else {
            returnItems = {};
        }
        for (i in collection) {
            itrItem = collection[i];
            if ($bean.collectionContains(values, itrItem[_valueField])) {
                if (isArray) {
                    returnItems.push(itrItem);
                } else {
                    returnItems[i] = itrItem;
                }
            }
        }
        return returnItems;
    }
    ,
    collectionFilterText: function (collection, pattern, textField, isArray) {
        if ($bean.isEmpty(collection)) {
            if (isArray) {
                return [];
            } else {
                return {};
            }
        }
        if ($bean.isEmpty(pattern)) {
            return collection;
        }
        var _textField = textField || 'title', returnItems, i, itrItem;
        if (isArray) {
            returnItems = [];
        } else {
            returnItems = {};
        }
        var itemValueNoSign, patternNoSign = JCommonUtil.toNoSign(pattern).toLowerCase();
        for (i in collection) {
            itrItem = collection[i];
            if ($bean.isNotEmpty(itrItem[_textField])) {
                itemValueNoSign = JCommonUtil.toNoSign(itrItem[_textField]).toLowerCase();
                if (itemValueNoSign.indexOf(patternNoSign) != -1) {
                    if (isArray) {
                        returnItems.push(itrItem);
                    } else {
                        returnItems[i] = itrItem;
                    }
                }
            }
        }
        return returnItems;
    }
    ,
    arrayToString: function (array, field) {
        if ($bean.isNotEmpty(array)) {
            var result;
            if ($bean.isNotEmpty(field)) {
                result = array[0][field];
            } else {
                result = array[0];
            }
            for (var i = 1; i < array.length; i++) {
                if ($bean.isNotEmpty(field)) {
                    result += ',' + array[i][field];
                } else {
                    result += ',' + array[i];
                }
            }
            return result;
        } else {
            return null;
        }
    }
    ,
    arrayToObjectWithId: function (array) {
        var obj = array.length > 0 ? {} : null;
        if ($bean.isNotEmpty(array)) {
            for (var i = 0; i < array.length; i++) {
                if ($bean.isNotNil(array[i].id)) {
                    obj[array[i].id] = array[i];
                } else {
                    obj = null;
                    break;
                }
            }
        }
        return obj;
    }
    ,
    copyObjectWithIdToArray: function (array, obj) {
        $bean.resetEmpty(array);
        var i;
        for (i in obj) {
            array.push(obj[i]);
        }
    }
    ,
    applyReferences: function (objMap, referenceMap, arrayMap, reset, skipIfExist, skipUpdateFields) {
        var i, j;
        for (i in objMap) {
            if ($bean.isEmpty(referenceMap[i])) {
                referenceMap[i] = objMap[i];
            } else {
                if (reset) {
                    $bean.resetEmpty(referenceMap[i]);
                }
                if (!skipIfExist) {
                    $bean.copyProperties(objMap[i], referenceMap[i], null, skipUpdateFields);
                }
            }
            if ($bean.isNotEmpty(arrayMap)) {
                for (j in arrayMap) {
                    if ($bean.isEmpty(arrayMap[j][i])) {
                        arrayMap[j][i] = referenceMap[i];
                    }
                }
            }
        }
    }
    ,
    findDifferent: function (array1, array2) {
        if ($bean.isEmpty(array1)) {
            return array2;
        }
        if ($bean.isEmpty(array2)) {
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
    }
    ,
    applyItemReferences: function (obj, referenceMap, arrayMap, reset, skipIfExist) {
        var objMap = {};
        objMap.id = obj;
        $bean.applyReferences(objMap, referenceMap, arrayMap, reset, skipIfExist);
    }
    ,
    deleteItemAllReferences: function (obj, referenceMap, arrayMap) {
        var i;
        for (i in arrayMap) {
            delete arrayMap[i][obj.id];
        }
        delete referenceMap[obj.id];
    }
    ,
    pushToMap: function (obj, arrayObj) {
        if ($bean.isEmpty(arrayObj)) {
            return;
        }
        var i, j;
        for (i in arrayObj) {
            if ($bean.isEmpty(arrayObj[i])) {
                arrayObj[i] = {};
            }
            for (j in obj) {
                arrayObj[i][j] = obj[j];
            }
        }
    }
    ,
    pushMap: function (obj, map, applyNull, fieldKey) {
        fieldKey = fieldKey || 'id';
        if ($bean.isEmpty(map)) {
            return;
        }
        if ($bean.isNotEmpty(obj)) {
            map[obj[fieldKey]] = obj;
        } else if (applyNull) {
            map[obj[fieldKey]] = obj;
        }
    }
    ,
    resetPushToMap: function (obj, arrayObj) {
        if ($bean.isEmpty(arrayObj)) {
            return;
        }
        var i, j;
        for (i in arrayObj) {
            $bean.resetEmpty(arrayObj[i]);
            for (j in obj) {
                arrayObj[i][j] = obj[j];
            }
        }
    }
    ,
    pushArrayToMap: function (objs, map, key) {
        var i, _key = key || 'id';
        for (i in objs) {
            map[objs[i][_key]] = objs[i];
        }
    }
    ,
    resetEmpty: function (collection) {
        if ($bean.isArray(collection)) {
            var i, size = collection.length;
            for (i = 0; i < size; i++) {
                collection.splice(0, 1);
            }
        } else {
            var prop;
            for (prop in collection) {
                if (collection.hasOwnProperty(prop)) {
                    delete collection[prop];
                }
            }
        }
    }
    ,
    pushItemToMap: function (obj, arrayObj) {
        if ($bean.isEmpty(arrayObj)) {
            return;
        }
        var i, j;
        for (i in arrayObj) {
            if ($bean.isEmpty(arrayObj[i])) {
                arrayObj[i] = {};
            }
            if ($bean.isEmpty(arrayObj[i][obj.id])) {
                arrayObj[i][obj.id] = {};
            }
            for (j in obj) {
                arrayObj[i][obj.id][j] = obj[j];
            }
        }
    }
    ,
    putOfMap: function (obj, arrayObj) {
        if ($bean.isEmpty(arrayObj)) {
            return;
        }
        var i;
        for (i in arrayObj) {
            delete arrayObj[i][obj.id];
        }
    }
    ,
    map: function (objs, fieldKey, valueKey) {
        var map = {};
        var _fieldKey = fieldKey || 'id';
        if ($bean.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                map[objs[i][_fieldKey]] = valueKey ? objs[i][valueKey] : objs[i];
            }
        }
        return map;
    }
    ,
    mapTree: function (objs, fieldKey, valueKey) {
        var map = {};
        var _fieldKey = fieldKey || 'id';
        if ($bean.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                map[objs[i][_fieldKey]] = valueKey ? objs[i][valueKey] : objs[i];
                if ($bean.isNotEmpty(objs[i].children)) {
                    var objChildren = objs[i].children, j;
                    for (j in objChildren) {
                        map[objChildren[j][_fieldKey]] = valueKey ? objChildren[j][valueKey] : objChildren[j];
                    }
                }
            }
        }
        return map;
    }
    ,
    mapList: function (objs, fieldKey) {
        var map = {};
        var _fieldKey = fieldKey || 'id';
        if ($bean.isNotEmpty(objs)) {
            var i;
            for (i in objs) {
                if ($bean.isNil(map[objs[i][_fieldKey]])) {
                    map[objs[i][_fieldKey]] = [];
                }
                map[objs[i][_fieldKey]].push(objs[i]);
            }
        }
        return map;
    }
    ,
    list: function (objMap, fieldName, distinct) {
        var _fieldName = fieldName || 'id';
        var values, key;
        if ($bean.isNotEmpty(objMap)) {
            values = [];
            for (key in objMap) {
                if (distinct && values.indexOf(objMap[key][_fieldName]) != -1) {
                    continue;
                }
                values.push(objMap[key][_fieldName]);
            }
        }
        return values;
    }
    ,
    arrayDistinct: function (array) {
        var i, returnVal = [];
        for (i in array) {
            if (returnVal.indexOf(array[i]) == -1) {
                returnVal.push(array[i]);
            }
        }
        return returnVal;
    }
    ,
    newObjIncludeProperties: function (source, skipProperties) {
        var newObj = null;
        if ($bean.isPlainObject(source)) {
            newObj = {};
            $bean.applyChangeProperties(source, newObj, false, skipProperties);
        }
        return newObj;
    }
    ,
    applyChangeProperties: function (source, target, applyNull, skipProperties) {
        if ($bean.isPlainObject(source) && $bean.isPlainObject(target)) {
            if ($bean.isEmpty(applyNull)) {
                applyNull = false;
            }
            var field;
            var sourceClone = $bean.clone(source);
            for (field in sourceClone) {
                if (($bean.isEmpty(skipProperties) || skipProperties.indexOf(field) == -1)
                    && (applyNull || $bean.isNotEmpty(sourceClone[field])) && (target[field] != sourceClone[field])) {
                    target[field] = sourceClone[field];
                }
            }
        }
    }
    ,
    newInstance: function () {
        var returnVal = {};
        if ($bean.isArray(arguments[0])) {
            returnVal = [];
        }
        var objs = [];
        $bean.collectionAdd(objs, returnVal);
        $bean.collectionAddAll(objs, arguments);
        $bean._extend(true, objs);
        return returnVal;
    }
    ,
    _extend: function (deepCopy, objs) {
        var target = objs[0];
        var i;
        for (i = 1; i < objs.length; i++) {
            if (deepCopy) {
                $.extend(true, target, objs[i]);
            } else {
                $.extend(target, objs[i]);
            }
        }
    }
    ,
    extend: function () {
        $bean._extend(true, arguments);
    }
    ,
    extendRefer: function () {
        $bean._extend(false, arguments);
    }
    ,
    setDefaultValues: function (target, defaultValue) {
        var defaultValueClone = {};
        $.extend(true, defaultValueClone, defaultValue);
        var i;
        for (i in defaultValueClone) {
            if ($bean.isNotNil(target[i])) {
                delete defaultValueClone[i];
            }
        }
        $.extend(true, target, defaultValueClone);
    }
    ,
    setCollection: function (collection, fieldName, value) {
        var i;
        for (i in collection) {
            collection[i][fieldName] = value;
        }
    }
    ,
    applyObjToCollection: function (obj, collection, applyNull, fields, skipFields, alwayNotExist, addFirst) {
        var existed = false, dbObj;
        if (!alwayNotExist) {
            var dbObj = $bean.getById(collection, obj.id);
            existed = $bean.isNotNil(dbObj);
        }
        if (existed) {
            $bean.copyProperties(obj, dbObj, fields, skipFields, applyNull);
        } else {
            $bean.collectionAdd(collection, obj, false, addFirst);
        }
        return dbObj ? dbObj : obj;
    }
    ,
    applyAllToCollection: function (objs, collection, applyNull, fields, skipFields, addFirst) {
        var i;
        if (addFirst) {
            for (i = objs.length - 1; i >= 0; i--) {
                $bean.applyObjToCollection(objs[i], collection, applyNull, fields, skipFields, $bean.isEmpty(collection), true);
            }
        } else {
            for (i in objs) {
                $bean.applyObjToCollection(objs[i], collection, applyNull, fields, skipFields, $bean.isEmpty(collection), true);
            }
        }
    }
    ,
    copyProperties: function (source, target, fields, skipFields, applyNull) {
        if ($bean.isPlainObject(source) && $bean.isPlainObject(target)) {
            if ($bean.isEmpty(applyNull)) {
                applyNull = false;
            }
            var fieldList, i;
            if ($bean.isEmpty(fields) || fields.length == 0) {
                fieldList = Object.keys(source);
            } else {
                fieldList = fields;
            }
            if ($bean.isNotEmpty(skipFields)) {
                for (i in skipFields) {
                    $bean.collectionRemove(fieldList, skipFields[i]);
                }
            }
            for (i in fieldList) {
                if ((applyNull || $bean.isNotNil(source[fieldList[i]]))) {
                    if ($bean.isPlainObject(source[fieldList[i]])) {
                        if ($bean.isEmpty(target[fieldList[i]])) {
                            if (source[fieldList[i]] instanceof Array) {
                                target[fieldList[i]] = [];
                            } else {
                                target[fieldList[i]] = {};
                            }
                        }
                        $.extend(true, target[fieldList[i]], source[fieldList[i]]);
                    } else if ($bean.isArray(source[fieldList[i]])) {
                        target[fieldList[i]] = target[fieldList[i]] || [];
                        var sourceObj = $bean.arrayToObjectWithId(source[fieldList[i]]);
                        var targetObj = $bean.arrayToObjectWithId(target[fieldList[i]]);
                        if (sourceObj == null || targetObj == null) {
                            target[fieldList[i]] = source[fieldList[i]];
                        } else {
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
                            $bean.copyObjectWithIdToArray(target[fieldList[i]], targetObj);
                            if ($bean.isNotEmpty(target[fieldList[i]]) && $bean.isNotEmpty(target[fieldList[i]][0].priority)) {
                                $bean.sortArray(target[fieldList[i]], "priority");
                            }
                        }
                    } else {
                        target[fieldList[i]] = source[fieldList[i]];
                    }
                }
            }
        }
    }
    ,
    getProperty: function (source, propertySelect) {
        if ($bean.isEmpty(source) || $bean.isEmpty(propertySelect)) {
            return null;
        }
        var properties = propertySelect.split('.'), i, property, objItr;
        objItr = source;
        for (i in properties) {
            property = properties[i];
            objItr = objItr[property];
            if ($bean.isEmpty(objItr)) {
                return objItr;
            }
        }
        return objItr;
    }
    ,
    split: function (s, delim) {
        if ($bean.isEmpty(s)) {
            return [];
        }
        if ($bean.isEmpty(delim)) {
            delim = $bean.STR_COMMA;
        }
        s = s.trim();
        var sn = s.split(delim);
        var i;
        for (i = 0; i < sn.length; i++) {
            sn[i] = sn[i].trim();
        }
        return sn;
    }
    ,
    clone: function (obj) {
        if (!$bean.isObject(obj)) {
            return obj;
        }
        if ($bean.isNotEmpty(obj)) {
            return $bean.newInstance(obj, {});
        }
        return null;
    }
    ,
    validateFile: function (file, fileSize) {
        if ($bean.isNil(fileSize)) {
            fileSize = goalConfigs.GOAL_ATTACH_SIZE;
        }
        if ($bean.isNotEmpty(file)) {
            if (file.size > fileSize * 1024 * 1024) {
                JCommonUtil.alertError({ message: JCommonUtil.message('error.file.size.too.max', 'error', [file.name, fileSize]) });
                return false;
            }
        }
        return true;
    }
    ,
    mapToArray: function (map) {
        var returnVal = [], i;
        if ($bean.isPlainObject(map) && !$bean.isEmptyObject(map)) {
            for (i in map) {
                returnVal.push(map[i]);
            }
        }
        return returnVal;
    }
    ,
    isString: function (func) {
        return (typeof func) == $bean.TYPE_STRING;
    }
    ,
    isObject: function (obj) {
        return (typeof obj) == $bean.TYPE_OBJECT;
    }
    ,
    isPlainObject: function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
    ,
    isDbObject: function (obj) {
        return $bean.isPlainObject(obj) && $bean.isNotNil(obj.id);
    }
    ,
    isArray: function (obj) {
        return Array.isArray(obj);
    }
    ,
    isFunction: function (func) {
        return (typeof func) == $bean.TYPE_FUNCTION;
    }
    ,
    isEmptyObject: function (obj) {
        return $bean.isEmpty(obj) || Object.keys(obj).length === 0;
    }
    ,
    isImage: function (contentType) {
        if ($bean.isEmpty(contentType)) {
            return false;
        }
        return contentType.indexOf('image/') != -1;
    }
    ,
    getFileType: function (file) {
        if ($bean.valueIn(file.fileExtension, ['xls', 'xlsx'])) {
            return 'fa-file-excel-o';
        }
        if ($bean.valueIn(file.fileExtension, ['doc', 'docx'])) {
            return 'fa-file-word-o';
        }
        if ($bean.valueIn(file.fileExtension, ['ppt', 'pptx'])) {
            return 'fa-file-powerpoint-o';
        }
        /*if ($bean.valueIn(fileExtension, ['vsd', 'vsdx'])) {
         return 'fa-file-visio-o';
         }*/
        if (file.fileExtension == 'pdf') {
            return 'fa-file-pdf-o';
        }
        if (file.fileExtension == 'rar') {
            return 'fa-file-archive-o';
        }
        if ($bean.valueIn(file.fileExtension, ['zip', '7z', 'gz'])) {
            return 'fa-file-zip-o';
        }
        if ($bean.valueIn(file.fileExtension, ['c', 'java', 'php', 'h', 'html', 'htm', 'js'])) {
            return 'fa-file-code-o';
        }
        if (file.fileExtension == 'external') {
            return 'fa-external-link';
        }
        if (file.contentType.indexOf('image/') != -1) {
            return 'fa-file-image-o';
        }
        if (file.contentType.indexOf('audio/') != -1) {
            return 'fa-file-audio-o';
        }
        if (file.contentType.indexOf('video/') != -1) {
            return 'fa-file-video-o';
        }
        if (file.contentType.indexOf('text/') != -1) {
            return 'fa-file-text-o';
        }
        return 'fa-file-o';
    }
    ,
    parseJson: function (value) {
        if ($bean.isEmpty(value)) {
            return null;
        }
        return JSON.parse(value);
    }
    ,
    getPaginated: function (dataLength, pageSize) {
        var page = 0;
        if (pageSize == 0) {
            pageSize = 20;
        }
        if (dataLength < pageSize) {
            page = 1;
        } else {
            page = Math.ceil(dataLength / pageSize) + 1;
        }
        return {
            page: page,
            pageSize: pageSize,
            maxRow: null,
            startRow: dataLength
        }

    }
    ,
    ltInteger: function (a, b) {
        if (parseInt(a) < parseInt(b)) {
            return true;
        } else {
            return false;
        }
    }
    ,
    eqInteger: function (a, b) {
        if (parseInt(a) == parseInt(b)) {
            return true;
        } else {
            return false;
        }
    }
    ,

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
            txt = $.language.getMessage("ihcm.goal.feedback.time.some.second", null);
            return txt;
        } else if (60 <= diffSecond && diffSecond < 120) { // 2 * 60
            // khoang mot phut truoc
            txt = $.language.getMessage("ihcm.goal.feedback.time.some.minute", null);
            return txt;
        } else if (120 <= diffSecond && diffSecond < 3600) { // 60 * 60
            // xxx phut truoc
            txt = $.language.getMessage("ihcm.goal.feedback.time.minute", diffMinute);
            return txt;
        } else if (3600 <= diffSecond && diffSecond < 7200) { // 2 * 60 * 60
            // vai gio truoc
            txt = $.language.getMessage("ihcm.goal.feedback.time.some.hour", null);
            return txt;
        } else if (7200 <= diffSecond && dateServer.getDate() == date.getDate() && dateServer.getMonth() == date.getMonth() && dateServer.getFullYear() == date.getFullYear()) { // 60 * 60 * 24
            // xxx gio truoc
            txt = $.language.getMessage("ihcm.goal.feedback.time.hour", diffHour);
            return txt;
        } else if (7200 <= diffSecond && (dateServer.getDate() - date.getDate()) == 1 && dateServer.getMonth() == date.getMonth() && dateServer.getFullYear() == date.getFullYear()) { // 2 * 60 * 60 * 24
            // hom qua luc xxx
            txt = $.language.getMessage("ihcm.goal.feedback.time.yesterday", [date.getHours(), date.getMinutes()]);
            return txt;
        } else {
            if (date.getYear() == dateServer.getYear()) {
                // trong nam
                txt = $.language.getMessage("ihcm.goal.feedback.time.some.date", [date.getDate(), date.getMonth() + 1, date.getHours(), date.getMinutes()]);
                return txt;
            } else if (date.getYear() < dateServer.getYear()) {
                // nam moi
                txt = $.language.getMessage("ihcm.goal.feedback.time.some.date.year", [date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getHours(), date.getMinutes()]);
                return txt;
            } else {
                txt = $.language.getMessage("ihcm.goal.feedback.time.some.date.year", [date.getDate(), date.getMonth() + 1, date.getFullYear(), date.getHours(), date.getMinutes()]);
            }
        }
        return null;
    }
    ,
    printCaseString: function () {
        var i;
        for (i in arguments) {
            if ($bean.isNotEmpty(arguments[i])) {
                return arguments[i];
            }
        }
        return null;
    }
    ,
    widgetExtendParams: function (scope, paramFields) {
        if ($bean.isNotNil(scope.params)) {
            $.extend(true, scope, scope.params.scope);
            if ($bean.isNotEmpty(paramFields)) {
                var i, paramField;
                for (i in paramFields) {
                    paramField = paramFields[i];
                    if ($bean.isNotNil(scope.params[paramField])) {
                        var fieldExtend = {};
                        fieldExtend[paramField] = scope.params[paramField];
                        $.extend(true, scope, fieldExtend);
                    }
                }
            }
        }

    }
    ,
    joinString: function (stringList, delim) {
        if ($bean.isEmpty(stringList)) {
            return null;
        }
        if ($bean.isNil(delim)) {
            delim = $bean.STR_COMMA + ' ';
        }
        var s = '';
        var i;
        for (i = 0; i < stringList.length; i++) {
            s += stringList[i] + delim;
        }
        s = s.substring(0, s.length - delim.length);
        return s;

    }
    ,
    toCSSStyle: function (configs) {
        var style = '', propName, propValue;
        if ($bean.isNotEmpty(configs)) {
            for (propName in configs) {
                propValue = configs[propName];
                if ($bean.isNil(propValue)) {
                    continue;
                }
                if ($bean.valueIn(propName, ['top', 'right', 'bottom', 'left', 'width', 'height'])) {
                    propValue = propValue + 'px';
                }
                style += propName + ':' + propValue + ';';
            }
            style = style.substring(0, style.length - 1);
        }
        return style;
    }
    ,
    isBoolean: function (boolean_s) {
        return (boolean_s == 'true' || boolean_s == 'false');
    }
    ,
    isNumber: function (number_s) {
        if ($bean.isNil(number_s)) {
            return false;
        }
        return !isNaN(number_s);
    }
    ,
    andBit: function (a, b) {
        return a & b;
    }
    ,
    orBit: function (a, b) {
        return a | b;
    }
    ,
    // alignLeftContent: tự động hiển thị căn trái đối với label khi click show dialog cập nhật
    showPos: function ($btn, $dialog, showCaret, alignLeftContent) {
        $dialog.offset({ top: 0, left: 0 });
        $dialog.find('.hd-caret').offset({ top: 0, left: 0 });
        var window_x = $btn.closest('#app-main').length > 0 ? $('#app-main').offset().left : 0;
        var btn_x = $btn.offset().left;
        var btn_y = $btn.offset().top;
        var window_w = $btn.closest('#app-main').length > 0 ? $('#app-main').outerWidth(true) : $(window).width();
        var window_h = $btn.closest('#app-main').length > 0 ? $('#app-main').outerHeight(true) : $(window).height();
        var shift_hor = btn_x < window_w / 2 ? 'left' : 'right'; // lệch trái | phải
        var shift_ver = btn_y < window_h / 2 ? 'top' : 'bottom'; // lệch trên | dưới
        var btn_w = $btn.outerWidth(true);
        var btn_h = $btn.outerHeight(true);
        var dialog_w;
        if ($dialog.find('.app-dlg').length > 0) {
            dialog_w = $dialog.find('.app-dlg').outerWidth(true);
        } else {
            dialog_w = $dialog.outerWidth(true);
        }
        var dialog_h = $dialog.outerHeight(true);
        var dialog_x, dialog_y;
        var paddingDialog = 10;
        if (shift_hor == 'left') {
            var outRangeLeft = (btn_x + btn_w / 2 - window_x) > dialog_w / 2;
            if (outRangeLeft) {
                dialog_x = btn_x + btn_w / 2 - dialog_w / 2;
            } else {
                dialog_x = paddingDialog + window_x;
            }
            if (dialog_x + dialog_w > window_w) {
                dialog_x = window_w - dialog_w - paddingDialog;
            }
        }
        if (shift_hor == 'right') {
            var outRangeRight = (window_w - btn_x - btn_w / 2 - paddingDialog) > dialog_w / 2;
            if (outRangeRight) {
                dialog_x = btn_x + btn_w / 2 - dialog_w / 2;
            } else {
                dialog_x = window_w + window_x - dialog_w - paddingDialog;
            }
        }
        if (shift_ver == 'top') {
            dialog_y = btn_y + btn_h + paddingDialog;
        }
        if (shift_ver == 'bottom') {
            dialog_y = btn_y - dialog_h - paddingDialog;
        }
        var caretSize = 16;
        var leftException = 0; // tro dung vao vung chu text
        if (btn_w > 40 && alignLeftContent) {
            leftException = btn_w / 2 - 16;
        }
        if (dialog_x - leftException > 0) {
            dialog_x = dialog_x - leftException;
        }
        $dialog.offset({
            top: dialog_y < 0 ? 0 : dialog_y, left: dialog_x
        });
        if (showCaret) {
            $dialog.find('.hd-caret').remove();
            var $caret = null;
            var caretLeft = btn_x + btn_w / 2 - caretSize / 2 - leftException;
            if (shift_ver == 'top') {
                $dialog.prepend('<span class="hd-caret top"></span>');
                $caret = $dialog.find('.hd-caret');
                $caret.offset({
                    top: dialog_y - caretSize,
                    left: caretLeft
                });
            }
            if (shift_ver == 'bottom') {
                $dialog.prepend('<span class="hd-caret bottom"></span>');
                $caret = $dialog.find('.hd-caret');
                $caret.offset({
                    top: dialog_y + dialog_h,
                    left: caretLeft
                });
            }
        }
    }
    ,
    range: function (start, end, step) {
        if ($bean.isEmpty(start) || $bean.isEmpty(end)) {
            return null;
        }
        if ($bean.isEmpty(step)) {
            step = 1;
        }
        var result = [];
        for (var i = start; i <= end; i += step) {
            result.push(i)
        }
        return result;
    }
    ,
    toArrayByProperty: function (arr, field) {
        if ($bean.isNotEmpty(arr)) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if ($bean.isNotEmpty(arr[i][field])) {
                    result.push(arr[i][field]);
                }
            }
            return result;
        }
        return null;
    }
    ,
    CONSOLE_LOG_ERROR: 'background: #f00; color: #fff;',
    CONSOLE_LOG_WARNING:
        'background: #f7921e; color: #fff;',
    CONSOLE_LOG_MSG:
        'color: #0072bc;',
    toConsoleMsg:

        function (text) {
            return '%c ' + text + ' ';
        }

    ,
    arrayStringContainsPattern: function (a, s) {
        var i;
        for (i in a) {
            if (a[i].indexOf(s) != -1) {
                return true;
            }
        }
        return false;
    }
    ,
    genIndexName: function (nameList, newName) {
        if (!$bean.arrayStringContainsPattern(nameList, newName)) {
            return newName;
        }
        var i = 1;
        while ($bean.arrayStringContainsPattern(nameList, newName + i)) {
            i++;
        }
        return newName + i;
    }
    ,
    documentReady: function (func) {
        angular.element(document).ready(function () {
            $functions.eval(func);
        });
    }
    ,
    genSelectPercent: function (value) {
        var values = [], count;
        if (value < 100) {
            value = Math.round((value + 5) / 10) * 10;
            count = 5;
            while (value <= 100 && count > 0) {
                values.push(value);
                value = value + 10;
                count--;
            }
        } else {
            values = new Array(90, 80, 70, 60, 50);
        }
        return values;
    }
    ,
    parseUrl: function (url) {
        var parser = document.createElement('a');
        parser.href = url;
        var actionName = parser.pathname.substring(parser.pathname.indexOf('/', 1) + 1, parser.pathname.indexOf('.'));
        var dataEntityName = $bean.toManyName(actionName);
        var actionMethod, paramString = '', params = [];
        if (parser.search.indexOf('&') != -1) {
            paramString = parser.search.substring(parser.search.indexOf('&') + 1, parser.search.length);
            var paramValuePairList = $bean.split(paramString, '&');
            var paramValuePair, paramKey, paramValue, i, i1;
            for (i in paramValuePairList) {
                paramValuePair = paramValuePairList[i];
                i1 = paramValuePair.indexOf('=');
                paramKey = paramValuePair.substring(0, i1);
                paramValue = paramValuePair.substring(i1 + 1, paramValuePair.length);
                params.push({ key: paramKey, value: paramValue });
            }
            actionMethod = parser.search.substring(parser.search.indexOf('=') + 1, parser.search.indexOf('&'));
        } else {
            actionMethod = parser.search.substring(parser.search.indexOf('=') + 1, parser.search.length);
        }
        return {
            protocol: parser.protocol,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            contextRoot: parser.pathname.substring(1, parser.pathname.indexOf('/', 1)),
            actionName: actionName,
            dataEntityName: dataEntityName,
            search: parser.search,
            actionMethod: actionMethod,
            paramString: paramString,
            params: params,
            hash: parser.hash,
            host: parser.host
        };
    }
    ,
    toManyName: function (name) {
        var returnVal;
        if (name.substring(name.length - 1, name.length) == 'y') {
            returnVal = name.substring(0, name.length - 1) + 'ies';
        } else {
            returnVal = name + 's';
        }
        return returnVal;
    }
    ,
    getTemplateUrl: function (templateKey) {
        return JCommonUtil.convertUrl('/uiTemplate?get') + '&templateKey=' + templateKey;
    }
    ,
    resetTo: function (type, obj, fields) {
        if (type == 'null') {
            var i;
            for (i in fields) {
                obj[fields[i]] = null;
            }
        }
        if (type == 'empty') {
            //
        }
    }
    ,
    destroyDirective: function (scope, element) {
        scope.$destroy();
        element.remove();
    }
    ,
    goLogout: function () {
        JCommonUtil.goPage(JGlobal.contextRoot + '/j_spring_logout.hyper');
    }
    ,
    checkElementInsideDom: function (element) {
        return $bean.isNotEmpty($(element).closest('html'));
    }
    ,
    parseTemplate: function (templateSelector) {
        var returnVal = {};
        var index = templateSelector.indexOf(':');
        returnVal.templateType = templateSelector.substring(0, index);
        var templateKey;
        if (returnVal.templateType == 'cache') {
            var pair = templateSelector.substring(index + 1, templateSelector.length).split('/');
            returnVal.cacheDir = pair[0];
            returnVal.templateKey = pair[1];
        } else {
            var i = returnVal.templateType.indexOf('[');
            if (i != -1) {
                returnVal.templateModule = returnVal.templateType.substring(i + 1, returnVal.templateType.indexOf(']'));
                returnVal.templateType = returnVal.templateType.substring(0, i);
            }
            templateKey = templateSelector.substring(index + 1, templateSelector.length);
            returnVal.templateKey = templateKey;
        }
        return returnVal;
    }
    ,
    //directiveOnFinishRender: function ($scope, $element, onFinishRender, watchAttrName) {
    //    var _watchAttrName = watchAttrName || 'scope-id';
    //    // on finish render
    //    $scope.$watch(function () {
    //        return $element.attr(_watchAttrName);
    //    }, function (newVal, oldVal) {
    //        if (_watchAttrName == 'dialog-id') {
    //            console.log(newVal, oldVal);
    //        }
    //        if (newVal != oldVal) {
    //            onFinishRender(newVal, oldVal);
    //        }
    //    });
    //},
    parseFunction: function (functionDirective) {
        if ($bean.isEmptyObject(functionDirective)) {
            return null;
        }
        var functionName = functionDirective.substring(1, functionDirective.indexOf('('));
        var functionParams_s = functionDirective.substring(functionDirective.indexOf('(') + 1, functionDirective.length - 1);
        var functionParams_l = $bean.split(functionParams_s);
        var functionParams = [];
        var i;
        for (i in functionParams_l) {
            functionParams.push($bean.parseJson(functionParams_l[i]));
        }
        return {
            name: functionName,
            params: functionParams
        };
    }
    ,
    closestDialogScope: function ($scope) {
        var $itr = $scope;
        while ($bean.isNotNil($itr) && $bean.isNil($itr.I_Am_Hd_Dialog)) {
            $itr = $itr.$parent;
        }
        return $bean.isNil($itr) || $bean.isNil($itr.I_Am_Hd_Dialog) ? $scope : $itr;
    }
    ,
    overwrite: function (source, target) {
        if ($bean.isNil(source)) {
            return;
        }
        var i;
        for (i in source) {
            if ($bean.isNotNil(source[i])) {
                target[i] = source[i];
            }
        }
    }
    ,
    camelToPascal: function (text) {
        return text
            // insert a - before all caps
            .replace(/([A-Z])/g, '-$1')
            // lower case all characters
            .toLowerCase();
    }
    ,
    textContains: function (text, search, isNoSign) {
        if ($bean.isNil(isNoSign)) {
            isNoSign = false;
        }
        if (JCommonUtil.isEmpty(search)) {
            return true;
        }
        if (JCommonUtil.isEmpty(text)) {
            return false;
        }
        if (isNoSign) {
            var text_noSign = JCommonUtil.toNoSignLowerCase(text);
            var search_noSign = JCommonUtil.toNoSignLowerCase(search);
            return text_noSign.indexOf(search_noSign) != -1;
        } else {
            return text.indexOf(search) != -1;
        }
    }
    ,
    for:

        function (objs, itrFunc, delim) {
            if ($bean.isEmpty(objs)) {
                return;
            }
            var _objs, i, obj;
            if ($bean.isString(objs)) {
                _objs = $bean.split(objs, delim);
            } else {
                _objs = objs;
            }
            for (i in _objs) {
                obj = _objs[i];
                itrFunc(obj);
            }
        }

    ,
    jointText: function (delim) {
        if ($bean.isEmpty(arguments)) return '';
        var _delim = delim;
        if ($bean.isEmpty(_delim)) {
            _delim = JStringUtil.UNDERLINE;
        }
        var i, text, returnVal = '';
        for (i in arguments) {
            text = arguments[i];
            if ($bean.isNotNil(text)) {
                returnVal += (text + _delim);
            }
        }
        return returnVal.substring(0, returnVal.length - _delim.length);
    }
    ,
    clickCheckInsideException: function (target) {
        return $bean.isNotEmpty($(target).closest('.ui-dialog'))
            || $bean.isNotEmpty($(target).closest('.ui-button-text'))
            || $bean.isNotEmpty($(target).closest('.ui-widget-overlay'))
            || $bean.isNotEmpty($(target).closest('.ui-datepicker'))
            || $bean.isNotEmpty($(target).closest('.ui-datepicker-header'))
            //|| $bean.isNotEmpty($(target).closest('.prettyPopin'))
            || $bean.isNotEmpty($(target).closest('.btn-not-close'));
    }
    ,
    notClickCheckInsideException: function (target) {
        return $bean.isEmpty($(target).closest('.ui-dialog'))
            && $bean.isEmpty($(target).closest('.ui-button-text'))
            && $bean.isEmpty($(target).closest('.ui-widget-overlay'))
            && $bean.isEmpty($(target).closest('.ui-datepicker'))
            && $bean.isEmpty($(target).closest('.ui-datepicker-header'));
    }
    ,
    cssAddClasses: function ($target, classes) {
        var i;
        for (i in classes) {
            $target.addClass(classes[i]);
        }
    }
    ,
    getKeyValue: function (itemList, keyValue, keyField, valueField) {
        if ($bean.isEmpty(itemList)) {
            return null;
        }
        keyField = keyField || "id";
        valueField = valueField || "name";
        var i, item;
        for (i in itemList) {
            item = itemList[i];
            if (item[keyField] == keyValue) {
                return item[valueField];
            }
        }
    }
    ,
    selectKeyValue: function (obj, property, itemList, keyValue, keyField, valueField) {
        keyField = keyField || "id";
        valueField = valueField || "name";
        obj[property] = $bean.getKeyValue(itemList, keyValue, keyField, valueField);
    }
    ,
    changeObjInObjs: function (objs, obj) {
        if (objs.length > 0 && $bean.isNotNil(obj)) {
            for (var i in objs) {
                if (objs[i].id == obj.id) {
                    objs[i] = obj;
                }
            }
        }
    }
    ,
    scrollToElem: function (activeElem, container) {
        if (activeElem && activeElem.offset()) {
            var scrollTop = activeElem.offset().top - container.offset().top - container.height() + activeElem.outerHeight();
            if (scrollTop >= 0) {
                container.scrollTop(container.scrollTop() + scrollTop);
            } else if (activeElem.offset().top - container.offset().top < 0) {
                container.scrollTop(container.scrollTop() + activeElem.offset().top - container.offset().top);
            }
        }
    }
    ,
    getNextOrder: function (order) {
        if (order == 0) {
            return 1;
        } else if (order == 1) {
            return -1;
        } else {
            return 0;
        }
    }
    ,
    rangePage: function (paginated) {
        var offset = 2;
        var totalPageShowed = 5;
        var min = Math.max(1, Math.min(paginated.maxPage - (totalPageShowed - 1), paginated.currentPage - offset));
        var max = Math.min(paginated.maxPage, Math.max(totalPageShowed, paginated.currentPage + offset));
        return $bean.range(min, max, 1);
    }
    ,
    findIndex: function (data, property, value) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][property] === value) {
                return i;
            }
        }
        return -1;

    }
    ,
    cloneFields: function (dataList, sources, targets) {
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            for (var j = 0; j < sources.length; j++) {
                data[targets[j]] = data[sources[j]];
            }
        }
        return dataList;
    }
    ,
    addPrefixLevel: function (dataList) {
        if ($bean.isNotEmpty(dataList)) {
            for (var i in dataList) {
                var item = dataList[i];
                item.prefixText = "";
                var prefixLevel = "";
                if ($bean.isNotEmpty(item.level) && item.level > 0) {
                    for (var i = 0; i < item.level; i++) {
                        prefixLevel += "-";
                        item.prefixText += "---";
                    }
                    item.prefixText += " ";
                    item.prefixLevelName = prefixLevel + ' ' + item.name;
                } else {
                    item.prefixLevelName = item.name;
                }
            }
        }
    }
    ,
    convertTreeToList: function (dataTree, fieldName) {
        if ($bean.isNotEmpty(dataTree)) {
            var dataList = [];
            for (var i in dataTree) {
                dataList.push(dataTree[i]);
                var childrenList = [];
                if ($bean.isNotEmpty(fieldName)) {
                    childrenList = dataTree[i][fieldName];
                } else {
                    childrenList = dataTree[i]['children'];
                }
                if ($bean.isNotEmpty(childrenList)) {
                    for (var j in childrenList) {
                        dataList.push(childrenList[j]);
                    }
                }
            }
            dataTree = dataList
        }
        return dataTree;
    }
    ,
    addPrefixLevelName: function (itemList) {
        if ($bean.isNotEmpty(itemList)) {
            for (var i in itemList) {
                itemList[i].prefixLevelName = itemList[i].name;
            }
        }
    }
    ,
    sha1: function (str) {
    }
    ,
    checkFeature: function (code) {
        return $bean.isNotEmpty(JGlobal.featureList) && JGlobal.featureList.indexOf(code) > -1;
    }
    ,
    toFloatData: function (sVal) {
        if ($bean.isEmpty(sVal)) {
            return sVal;
        }
        return (sVal + '').replace(',', '.');
    }
    ,
    toFloatLocale: function (sVal) {
        if ($bean.isEmpty(sVal)) {
            return sVal;
        }
        return (sVal + '').replace('.', ',');
    },
    checkNumberOffset(number, offset) {
        if ($bean.isNumber(number) && $bean.isNumber(offset)) {
            return true;
        }
        return false;
    },

    cloneJson(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    getCurrentSqlTime() {
        // return new Date().toISOString().slice(0, 19).replace('T', ' ')
        return new Date().toISOString()
    }
};
