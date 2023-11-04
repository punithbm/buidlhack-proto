import "@/styles/globals.css";

import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Homepage",
  description: "Home page",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  widget: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.widget}
    </>
  );
}
