export function isURL(str: string): boolean {
    if (!str.toLowerCase().includes("http")) return false

    try {
        const url = new URL(str)
        return ["http:", "https:"].includes(url.protocol)
    } catch (e) {
        return false
    }
}
