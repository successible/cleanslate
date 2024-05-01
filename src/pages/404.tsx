import { css } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../components/navbar/Navbar";
import { colors } from "../theme";

const NotFound = () => {
  const panel = css`
    > div {
      background-color: ${colors.background};
      border-radius: 5px;
      max-width: 85%;
      padding: 40px 60px;
    }
  `;

  return (
    <>
      <Head>
        <title>Clean Slate | 404</title>
      </Head>
      <Navbar />
      <div css={panel} className={"w100 fcc expand h100 fcc"}>
        <div className="white fcc tcenter">
          <h1 className="no-wrap">Page not found!</h1>
          <button className="danger normal mt10">
            <Link href="/">Take me home</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
