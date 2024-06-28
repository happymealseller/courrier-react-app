export { formatTimestamp };

function formatTimestamp(timestamp: string, includeTime: boolean) {
    return includeTime ? (new Date(timestamp)).toLocaleString('default', { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h24" })
        .replace(/AM|PM/, "")
        :
        (new Date(timestamp)).toLocaleString('default', { day: "numeric", month: "short", year: "numeric" });
}