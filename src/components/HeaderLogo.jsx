import CompanyLogo from "/Images/mulelogo.svg";
import "../assets/Common.css";
export default function HeaderLogo() {
  return (
    <>
      <img src={CompanyLogo} alt="company logo" className="header-comp" />
    </>
  );
}
