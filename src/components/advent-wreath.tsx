import Image from 'next/image';
import { useMemo } from 'react';
import fourthAdvent from '../../public/advent-wreath/four.svg';
import firstAdvent from '../../public/advent-wreath/one.svg';
import thirdAdvent from '../../public/advent-wreath/three.svg';
import secondAdvent from '../../public/advent-wreath/two.svg';
import noAdvent from '../../public/advent-wreath/zero.svg';

export interface Props {
    candles: number;
}

const IMAGES = [noAdvent, firstAdvent, secondAdvent, thirdAdvent, fourthAdvent];

export default function AdventWreath({ candles }: Props) {
    const index = useMemo(() => candles % 4, [candles]);

    return (
        <div>
            <Image
                alt={`Adventskranz mit ${index} brennenden Kerzen`}
                src={IMAGES[index]}
                priority
            />
        </div>
    );
}
