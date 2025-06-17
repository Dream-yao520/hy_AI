const f = []
const clibStairs = (n) => {
    if (n === 1) return 1
    if (n === 2) return 2
    if (f[n] === undefined) {
        f[n] = clibStairs(n - 1) + clibStairs(n - 2)
    }
    return f[n]
}