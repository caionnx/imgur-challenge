import React from "react";
import { DefaultLayout } from "../layout/index";
import { Refine } from "../modules/Refine";
import { Grid } from "../modules/Grid";

export const Home = () => {
  return (
    <DefaultLayout>
      <Refine />
      <Grid />
    </DefaultLayout>
  );
};
