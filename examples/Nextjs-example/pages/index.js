import Layout from "../components/MyLayout.js";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

//Custom <App>
const Index = props => (
  <Layout>
    <Head>
      <title>The Batman Series</title>
    </Head>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        //Routing
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{//----Creating the style-sheet for the page---//
    `
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
);
//----------Component Life Cycle--------//
//------Reusing the built in errors-----//
Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");

  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  const errorCode = res.statusCode > 200 ? res.statusCode : false;
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    statusCode,
    errorCode,
    shows: data.map(entry => entry.show)
  };
};

export default Index;
