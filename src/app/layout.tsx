"use client";
import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/context/context";
import { Provider } from "react-redux";
import store from "@/state/store";
import DrawerContainer from "@/components/ui/drawer-container/drawer-container";
import ToastContainer from "@/components/ui/toast-container/toast-container";

// export const metadata: Metadata = {
//   title: "Sample App",
//   description: "Sample App using next app router",
// };

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: any;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider store={store}>
          <UserContextProvider>
            <DrawerContainer />
            <ToastContainer {...pageProps} />
            <div>{children}</div>
          </UserContextProvider>
        </Provider>
      </body>
    </html>
  );
}
