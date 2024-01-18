// Writing a JSON parser from scratch in TypeScript for learning.
type JSONValue = JSONValue[] | JSONObject | string | number | boolean | null;

interface JSONObject {
  [key: string]: JSONValue;
}

class JSONParser {
  private json: string;
  private index: number;

  constructor(json: string) {
    this.json = json.trim();
    this.index = 0;
  }

  parse(): JSONValue {
    return this.parseValue(this.json);
  }

  private parseValue(value: string): JSONValue {
    if (/^\{.*\}$/.test(value)) {
      return this.parseObject(value);
    } else if (/^\[.*\]$/.test(value)) {
      return this.parseArray(value);
    } else if (/^\".*\"$/.test(value)) {
      return this.parseString(value);
    } else if (/^true$/.test(value)) {
      return true;
    } else if (/^false$/.test(value)) {
      return false;
    } else if (/^null$/.test(value)) {
      return null;
    } else if (/^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(value)) {
      return Number(value);
    } else {
      throw new Error("Invalid JSON");
    }
  }

  private parseObject(value: string): JSONValue {
    const obj: JSONValue = {};
    const keyValueRegex =
      /\s*"(?<key>[^"]+)"\s*:\s*(?<value>"[^"]+"|\[.*\]|\{.*\}|[^,"\{\[\}\}]+)\s*/g;
    const pairs = value.matchAll(keyValueRegex);
    let pair = pairs.next().value;

    while (pair) {
      // @ts-ignore
      const { key, value } = pair.groups;
      obj[key] = this.parseValue(value);
      pair = pairs.next().value;
    }

    return obj;
  }

  private parseArray(value: string): JSONValue[] {
    const arr: JSONValue[] = [];
    const elements = value.slice(1, -1).split(",");

    for (const elem of elements) {
      arr.push(this.parseValue(elem.trim()));
    }

    return arr;
  }

  private parseString(value: string): string {
    return value.slice(1, -1);
  }
}

// Example usage
const jsonString =
  '{"name":"John","age":30,"isAdmin":true,"friends":["Jane","Tom"],"address":null, "object": {"test1": true, "test2": false}}';
const parser = new JSONParser(jsonString);
const jsonObject = parser.parse();
console.log(jsonObject);
