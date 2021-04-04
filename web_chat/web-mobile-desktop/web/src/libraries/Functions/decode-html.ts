export default function decodeHTML(str: string): string {
    return str.replace(/&#([0-9]+);/g, function(full, int) {
        return String.fromCharCode(parseInt(int));
    });
}