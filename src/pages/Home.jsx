import HeroSectionHome from "../components/HeroSectionHome";
import Nav from "../components/NavbarHome";
import HomeMain from "../components/HomeMain";
import HomeFooter from "../components/HomeFooter";

export default function Home({ name }) {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 5 && currentHour < 2
      ? "Good Morning"
      : currentHour >= 2 && currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";
  };
  const greeting = getGreeting();
  return (
    <>
      <div className="home">
        <Nav name={name} />
        <div className="Wrapper">
          <HeroSectionHome greeting={greeting} />
          <HomeMain />
        </div>
        <HomeFooter />
      </div>
    </>
  );
}
