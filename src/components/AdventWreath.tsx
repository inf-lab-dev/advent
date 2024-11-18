import Image from 'next/image';
import fourthAdvent from '../../public/advent-wreath/four.svg';
import firstAdvent from '../../public/advent-wreath/one.svg';
import thirdAdvent from '../../public/advent-wreath/three.svg';
import secondAdvent from '../../public/advent-wreath/two.svg';
import noAdvent from '../../public/advent-wreath/zero.svg';

export interface Props {
    advent: 0 | 1 | 2 | 3 | 4;
}

const IMAGES = [noAdvent, firstAdvent, secondAdvent, thirdAdvent, fourthAdvent];

export default function AdventWreath({ advent }: Props) {
    return (
        <div>
            <Image
                priority
                src={IMAGES[advent]}
                alt={`Adventskranz mit ${advent} brennenden Kerzen`}
            />
        </div>
    );
}
