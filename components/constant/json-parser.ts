interface IJsonParser {
  tryParse<ReturnType = unknown>(raw: string): ReturnType | undefined;
  tryStringify(obj?: Record<string, any>): string;
}

export const tryParse: IJsonParser["tryParse"] = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const tryStringify: IJsonParser["tryStringify"] = (obj) => {
  try {
    return JSON.stringify(obj) || "";
  } catch {
    return "";
  }
};

export default class JsonParser implements IJsonParser {
  tryParse = tryParse;
  tryStringify = tryStringify;

  static tryParse = tryParse;
  static tryStringify = tryStringify;
}
