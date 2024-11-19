export type AdventSunday = 1 | 2 | 3 | 4;

export type Advent = (typeof LITERALS)[number];

const LITERALS = ['first', 'second', 'third', 'fourth'] as const;

export function toLiteral(sunday: AdventSunday) {
    return LITERALS[sunday - 1];
}

export function fromLiteral(
    literal: (typeof LITERALS)[number],
): AdventSunday | null {
    const sunday = LITERALS.indexOf(literal) + 1;

    if (sunday > 4 || sunday < 1) {
        return null;
    }

    return sunday as AdventSunday;
}
