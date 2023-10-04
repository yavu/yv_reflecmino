export function compose_n<A>(n: number, f: (a: A) => A): (a: A) => A {
    return [...Array(n - 1)].reduce((a) => (x: A) => f(a(x)), f);
};

export const while_f = <A>(a: A, f: (a: A) => [cont: boolean, a: A]): A => {
    let cont: boolean;
    do { [cont, a] = f(a); } while (cont);
    return a;
};

export const replace_array = <A>(base: A[], index: number, other: A) => [...base.slice(0, index), other, ...base.slice(index + 1)];

export const replace_2d_array = <A>(base: A[][], x: number, y: number, other: A) => {
    const y_array = replace_array(base[y], x, other);
    return replace_array(structuredClone(base), y, y_array);
};