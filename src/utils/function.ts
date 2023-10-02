export function compose_n<A>(n: number, f: (a: A) => A): (a: A) => A {
    return [...Array(n - 1)].reduce((a) => (x: A) => f(a(x)), f);
}

export const while_f = <A>(a: A, f: (a: A) => [cont: boolean, a: A]): A => {
    let cont: boolean;
    do { [cont, a] = f(a); } while (cont);
    return a;
};