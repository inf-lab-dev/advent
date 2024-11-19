import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer>
            <hr className="mx-auto w-11/12" />

            <section className="container mx-auto px-6 py-12 text-center">
                <h3 className="flex justify-center gap-2">
                    Made with <Heart className="text-red-700" /> by inf-lab.dev
                </h3>
            </section>
        </footer>
    );
}
