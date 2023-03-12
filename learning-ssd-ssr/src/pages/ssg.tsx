import { getRandomValues } from 'crypto';
import Head from 'next/head';

export default function ssg({ random }: any) {
  return (
    <>
      <Head>
        <title>SSG</title>
        <meta />
        <link
          rel='stylesheet'
          href=''
        />
      </Head>
      <p>
        SSGで生成されたページです
        <br />
        <em>{random}</em>
      </p>
    </>
  );
}
export async function getStaticProps() {
  const random = Math.floor(Math.random() * 100);

  return {
    props: {
      random,
    },
  };
}
