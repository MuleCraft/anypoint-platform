import HeroSectionHome from "../components/HeroSectionHome";
import Nav from "../components/NavbarHome";
import HomeMain from "../components/HomeMain";
import HomeFooter from "../components/HomeFooter";
export default function Home() {
  return (
    <>
      <div className="home">
        <Nav />
        <div className="Wrapper">
          <HeroSectionHome />
          <HomeMain />
        </div>
        <HomeFooter />
      </div>
    </>
  );
}
