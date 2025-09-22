let u: unknown;

u = 123;
u = 'hello'

if (typeof u === 'number') {
    u.toFixed() // 安全
}
