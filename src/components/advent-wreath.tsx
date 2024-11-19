import { AdventSunday } from '@/lib/advent';
import Image from 'next/image';
import fourthAdvent from '../../public/advent-wreath/four.svg';
import firstAdvent from '../../public/advent-wreath/one.svg';
import thirdAdvent from '../../public/advent-wreath/three.svg';
import secondAdvent from '../../public/advent-wreath/two.svg';
import noAdvent from '../../public/advent-wreath/zero.svg';

export interface Props {
    advent: null | AdventSunday;
}

const IMAGES = [noAdvent, firstAdvent, secondAdvent, thirdAdvent, fourthAdvent];

export default function AdventWreath({ advent }: Props) {
    return (
        <div>
            <Image
                priority
                src={IMAGES[advent ?? 0]}
                alt={`Adventskranz mit ${advent ?? 0} brennenden Kerzen`}
            />
        </div>
    );
}
