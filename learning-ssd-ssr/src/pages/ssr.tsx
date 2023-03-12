import Head from 'next/head';

export default function ssr({ random }: any) {
  return (
    <>
      <Head>
        <title>SSR</title>
      </Head>
      <p>
        SSRで生成されたページです
        <br />
        <em>{random}</em>
      </p>
    </>
  );
}

export async function getServerSideProps() {
  const random = Math.floor(Math.random() * 100);

  return {
    props: {
      random,
    },
  };
}
