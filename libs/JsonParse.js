function JsonParse(st) {
    if(typeof st == 'string') {
        return JSON.parse(st);
    } else {
        return st;
    }
}