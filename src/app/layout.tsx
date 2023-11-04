import "@/styles/globals.css";
import { Header } from "@/ui_components/shared";
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
      <body className="h-full">
        <Header />
        <main className="h-full pt-16">
          <div className="container mx-auto">{props.children}</div>
        </main>
      </body>
    </html>
  );
}
