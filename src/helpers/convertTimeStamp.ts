export function convertTimestamp(num: number) {
    const date = new Date(num);
    return date.toLocaleDateString('en-US');
}