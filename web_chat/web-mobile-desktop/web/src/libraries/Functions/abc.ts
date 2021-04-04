function uniqByKeepFirst(a:any[], key: any) {
    let seen = new Set();
    return a.filter(item => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    })
}

export default uniqByKeepFirst