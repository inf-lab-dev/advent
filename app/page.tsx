import AdventWreath from '@/components/AdventWreath';

export default function Home() {
    return (
        <div>
            <p>Welcome to the page!</p>
            <AdventWreath advent={4} />

            <div>
                Somewhere on the page drop credit for the wreath images:
                <p>
                    Image by&nbsp;
                    <a
                        href="https://pixabay.com/users/openclipart-vectors-30363"
                        className="text-blue-800 hover:underline"
                    >
                        OpenClipart-Vectors
                    </a>
                    &nbsp;from&nbsp;
                    <a
                        href="https://pixabay.com/"
                        className="text-blue-800 hover:underline"
                    >
                        Pixabay
                    </a>
                </p>
            </div>
        </div>
    );
}
