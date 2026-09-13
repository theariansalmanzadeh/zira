import Navbar from "@shared/components/navbar/Navbar";
import Footer from "@shared/components/footer/Footer";
import Banner from "@/src/shared/components/ui/Banner";
import AuthProvider from "@/src/shared/context/AuthProvider";
import Modal from "@/src/shared/components/modals/Modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Banner isLoggedIn={false} />
      <div className="body-container">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
      <Modal />
    </AuthProvider>
  );
}
