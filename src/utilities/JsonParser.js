var JSONParser = /** @class */ (function () {
    function JSONParser(json) {
        this.json = json.trim();
        this.index = 0;
    }
    JSONParser.prototype.parse = function () {
        return this.parseValue(this.json);
    };
    JSONParser.prototype.parseValue = function (value) {
        if (/^\{.*\}$/.test(value)) {
            return this.parseObject(value);
        }
        else if (/^\[.*\]$/.test(value)) {
            return this.parseArray(value);
        }
        else if (/^\".*\"$/.test(value)) {
            return this.parseString(value);
        }
        else if (/^true$/.test(value)) {
            return true;
        }
        else if (/^false$/.test(value)) {
            return false;
        }
        else if (/^null$/.test(value)) {
            return null;
        }
        else if (/^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(value)) {
            return Number(value);
        }
        else {
            throw new Error("Invalid JSON");
        }
    };
    JSONParser.prototype.parseObject = function (value) {
        var obj = {};
        var keyValueRegex = /\s*"(?<key>[^"]+)"\s*:\s*(?<value>"[^"]+"|\[.*\]|\{.*\}|[^,"\{\[\}\}]+)\s*/g;
        var pairs = value.matchAll(keyValueRegex);
        var pair = pairs.next().value;
        while (pair) {
            // @ts-ignore
            var _a = pair.groups, key = _a.key, value_1 = _a.value;
            obj[key] = this.parseValue(value_1);
            pair = pairs.next().value;
        }
        return obj;
    };
    JSONParser.prototype.parseArray = function (value) {
        var arr = [];
        var elements = value.slice(1, -1).split(",");
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            arr.push(this.parseValue(elem.trim()));
        }
        return arr;
    };
    JSONParser.prototype.parseString = function (value) {
        return value.slice(1, -1);
    };
    return JSONParser;
}());
// Example usage
var jsonString = '{"name":"John","age":30,"isAdmin":true,"friends":["Jane","Tom"],"address":null, "object": {"test1": true, "test2": false}}';
var parser = new JSONParser(jsonString);
var jsonObject = parser.parse();
console.log(jsonObject);
