import Footer from "@/Component/Footer";
import Navbar from "@/Component/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
