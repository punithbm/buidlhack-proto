import "@/styles/globals.css";
import { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  widget: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full bg-white">
        <main className="h-full">{props.children}</main>
      </body>
    </html>
  );
}
