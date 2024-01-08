export const NOT_EMPTY_MATCHER = new RegExp(/^\s*.+\s*$/);

export const YES_OR_NOT_MATCHER = new RegExp(/^\s*(Tak|Nie)\s*$/);

export const DATETIME_MATCHER = new RegExp(/^\s*\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])\s*$/)