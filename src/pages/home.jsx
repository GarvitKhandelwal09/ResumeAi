import Features from "../components/feature";
import Footer from "../components/footer";
import Hero from "../components/heroSection";
import Navbar from "../components/navbar";
import Login from "./loginpage";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Footer/>
   
    </>
  );
}

export default Home;