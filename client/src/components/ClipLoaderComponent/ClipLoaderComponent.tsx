import React from "react";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
const override = css`
  display: block;
  margin: 0 auto;
`;

export const ClipLoaderComponent = ({ loading }: { loading: boolean }) => {
    return <ClipLoader
        css={override}
        size={150}
        color={"#123abc"}
        loading={loading}
    />

}