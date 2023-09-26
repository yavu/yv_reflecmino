export function compose_n<A>(n: number, f: (a: A) => A): (a: A) => A {
    return [...Array(n - 1)].reduce((a) => (x: A) => f(a(x)), f);
}
