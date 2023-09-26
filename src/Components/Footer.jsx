import CompanyLogo from "../assets/Context/CompanyIdentity";
const Footer = () => {
  return (
    <footer className="bg-black  py-2">
      <div className="container  mx-auto text-center">
        <div className="text-primary text-sm">
          Subscribe to get our latest recipes:
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-50 md:w-2/3 lg:w-1/2 px-4 py-2 mt-2  border bg-crisp-white"
          />
          <button className="bg-secondary hover:bg-accent text-white py-2 px-4 rounded mt-2">
            Subscribe
          </button>
        </div>

        <p className="text-white mt-2 text-sm">
          <CompanyLogo />
          &copy; 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
