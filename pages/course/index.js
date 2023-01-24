import Banner from '../../components/course/banner';
import Table from '../../components/course/table';
import { Container } from '../../components/layout';

export default function Course() {
  const metaTags = {
    title: 'Solana Development Course',
    description:
      'This course is designed to be the absolute best starting point for Web Developers looking to learn Web3 Development. Solana is the ideal network for starting your Web3 journey because of its high speed, low cost, energy efficiency, and more.',
    url: 'https://soldev.app/course',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="mx-2">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            Solana Development Course
          </h1>

          <Banner />
        </div>

        <div className="mx-auto mt-5 max-w-4xl">
          <p className="prose mx-auto text-center text-lg dark:prose-invert">
            This course is designed to be the absolute best starting point for Web Developers
            looking to learn Web3 Development. Solana is the ideal network for starting your Web3
            journey because of its high speed, low cost, energy efficiency, and more.
          </p>
        </div>

        <Table />
      </div>
    </Container>
  );
}
