// @ts-nocheck
import { $bean } from "./hyd-bean-utils";

export let JCommonUtil = (function () {
    var SCREEN_WIDTH = 0;
    var ins = {};
    ins.SCREEN1_X = 639;
    ins.SCREEN1_N = 640;
    ins.SCREEN2_X = 767;
    ins.SCREEN2_N = 768;
    ins.SCREEN3_X = 899;
    ins.SCREEN3_N = 900;
    ins.SIDE_BAR_WIDTH = 40;

    ins.MAIN_COLOR_1 = '#0072bc';
    ins.MAIN_COLOR_2 = '#f7921e';

    ins.TREND_UP_COLOR = '#0071BB';
    ins.TREND_NORMAL_COLOR = '#F7931D';
    ins.TREND_DOWN_COLOR = '#ED1C24';
    ins.NONE_COLOR = '#dff0fd';

    ins.IMG_SIZE_24 = 24;
    ins.IMG_SIZE_32 = 32;
    ins.IMG_SIZE_40 = 40;
    ins.IMG_SIZE_48 = 48;
    ins.IMG_SIZE_64 = 64;
    ins.IMG_SIZE_80 = 80;
    ins.IMG_SIZE_120 = 120;

    ins.COMMON_BOX_PADDING = 12;
    ins.COMMON_PADDING = 10;
    ins.COMMON_ELEMENT_PADDING = 5;

    ins.COMMON_ICON_EXPAND_CLASS = 'icon-expand';
    ins.COMMON_ICON_COLLAPSE_CLASS = 'icon-collapse';
    ins.COMMON_ICON_EXPAND_WHITE_CLASS = 'icon-expand-white';
    ins.COMMON_ICON_COLLAPSE_WHITE_CLASS = 'icon-collapse-white';

    ins.COMMON_SCROLL_TOP = 10;

    ins.ICON_SIZE_32 = 32;

    ins.ANIMATE_FOCUS_BG = '#0072bc';
    ins.ERROR_BG = '#FFBABA';
    ins.ANIMATE_FOCUS_TIME = 350 * 2;
    ins.ANIMATE_SHOW_HIDE_TIME = 200;

    ins.APPEND = 'append';
    ins.PREPEND = 'prepend';
    ins.INSERT_BEFORE = 'insert_before';
    ins.INSERT_AFTER = 'insert_after';

    ins.RESULT_ERROR = '@error:';
    ins.RESULT_MESSAGE = '@msg:';

    ins.MESSAGE_TYPE_INFO = 'info';
    ins.MESSAGE_TYPE_WARNING = 'warning';
    ins.MESSAGE_TYPE_ERROR = 'error';
    ins.MESSAGE_TYPE_SUCCESS = 'success';
    ins.MESSAGE_TYPE_PUSH = 'push';

    ins.lyLoadingClass = 'ly-loading-overlay';

    ins.REQUEST_FORM_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};

    ins.SPECIAL_NAME = ['m', 'page', 'sortField', 'ascent'];

    ins.getTimeNow = function () {
        var dateTimeNow = new Date();
        var hour = dateTimeNow.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minute = dateTimeNow.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        return hour + ':' + minute;
//        return dateTimeNow.toLocaleTimeString('en-US', {
//            hour12: false,
//            hour: "numeric",
//            minute: "numeric"
//        });
    }

    ins.getValueSelectMe = function (name) {
        var radios = document.getElementsByName(name);
        if (!radios || radios.length < 1) {
            return null;
        }
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return null;
    }

    ins.question = function (msg) {
        var ok = confirm(msg);
        if (ok)
            return true;
        else
            return false;
    }

    ins.questionAjax = function (key, bundle, args) {
        var msg = ins.message(key, bundle, args);
        return ins.question(msg);
    }


    ins.hyperRightUrl = function (url) {
        if (!url) {
            return url;
        }
        url = url.trim();
        var action = null;
        var method = null;
        var index = url.toLowerCase().indexOf(JGlobal.actionPattern);
        if (index > -1) {
            var indexContextRoot = url.toLowerCase().indexOf(JGlobal.contextRoot);
            if (indexContextRoot != -1) {
                indexContextRoot = indexContextRoot + JGlobal.contextRoot.length;
            } else {
                indexContextRoot = 0;
            }
            action = url.substring(indexContextRoot, index);
        }
        index = url.toLowerCase().indexOf("&" + JGlobal.actionMethod + "=");
        if (index == -1) {
            index = url.toLowerCase().indexOf("?" + JGlobal.actionMethod + "=");
        }
        if (index > -1) {
            method = url.substring(index + 2 + JGlobal.actionMethod.length);
            index = method.indexOf("&");
            if (index > -1) {
                method = method.substring(0, index);
            }
        }
        if (method == null) {
            method = "";
        }
        return action + "?" + method;
    }

    ins.genRandomID = function (length) {
        if ($bean.isEmpty(length)) {
            length = 5;
        }
        var text = "";
        for (var i = 0; i < length; i++) {
            text += CHAR_POSSIBLE.charAt(Math.floor(Math.random() * CHAR_POSSIBLE.length));
        }
        return text;
    }

    ins.pdateFieldToUrl = function (url, nameValues) {
        if (url) {
            var startParamIndex = url.length;
            if (url.indexOf('?') != -1) {
                startParamIndex = url.indexOf('?');
            }
            var newParamStr = '';
            var i, j;
            var setParams = url.substring(startParamIndex + 1, url.length).split('&');
            nameValues = nameValues.split('&');
            var nameValue, name, value, flag;
            for (i in nameValues) {
                nameValue = nameValues[i].split('=');
                name = nameValue[0];
                value = nameValue[1];
                flag = false;
                for (j in setParams) {
                    if (setParams[j].split('=')[0] == name) {
                        setParams[j] = nameValues[i];
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    setParams.push(nameValues[i]);
                }
            }
            for (i in setParams) {
                newParamStr += setParams[i] + '&';
            }
            return url.substring(0, startParamIndex) + '?' + newParamStr.substring(0, newParamStr.length - 1);
        }
    }

    ins.toString = function (s) {
        return '"' + s + '"';
    }

    ins.isInteger = function (s) {
        var i;
        if (ins.isEmpty(s)) return false;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);

            if (!ins.isDigit(c)) return false;
        }

        return true;
    }
    ins.isEmpty = function (s) {
        return ((s == null) || (s.length == 0) || (s == "null"))
    }

    ins.isDigit = function (c) {
        return ((c >= "0") && (c <= "9"))
    }

    ins.mustPressInteger = function (obj) {
        var value = obj.value;
        if (!ins.isInteger(value)) {
            obj.value = value.substring(0, value.length - 1);
        }
    }

    ins.toNoSignLowerCase = function (value) {
        if (value == "") {
            return "";
        }
        var str = value;
        str = str.toLowerCase();
        return ins.toNoSign(str);
    }

    ins.toNoSign = function (value) {
        if (value == "") {
            return "";
        }
        var str = value;
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    ins.genAlias = function (str) {
        var i_str = str;
        i_str = i_str.replace('/_+/g', ' ');
        i_str = i_str.trim();
        var noSign = JCommonUtil.toNoSign(i_str);
        var alias = noSign.replace(/\s+/g, '_');
        alias = alias.replace(/[^\w]/g, '');
        return alias;
    }

    ins.genAliasLowerCase = function (str) {
        var alias = ins.genAlias(str);
        alias = alias.toLowerCase();
        return alias;
    }

    ins.getSign = function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|ằ|ầ|è|é|ì|ò|ờ|ồ|ù|ỳ/g, "f");
        str = str.replace(/á|ấ|ắ|é|ế|í|ó|ố|ớ|ú|ứ|ý/g, "s");
        str = str.replace(/ạ|ặ|ậ|ẹ|ệ|ị|ọ|ợ|ộ|ụ|ự|ỵ/g, "j");
        str = str.replace(/ã|ẵ|ẫ|ẽ|ễ|ĩ|õ|ỡ|ỗ|ũ|ữ|ỹ/g, "x");
        str = str.replace(/ả|ẳ|ẩ|ẻ|ể|ỉ|ỏ|ở|ổ|ủ|ử|ỷ/g, "r");
        str = str.replace(/ă|ơ|ư/g, "w");
        str = str.replace(/â/g, "a");
        str = str.replace(/ê/g, "e");
        str = str.replace(/ô/g, "o");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\\s/g, " ");
        return str;
    }

    ins.removeParameterByName = function (key, sourceURL) {
        var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }
    return ins;
})
();
// module.exports = JCommonUtil;