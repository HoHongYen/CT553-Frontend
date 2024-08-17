import FooterAbout from "../features/footer/FooterAbout";
import FooterContact from "../features/footer/FooterContact";
import FooterMap from "../features/footer/FooterMap";

function Footer() {
  return (
    <footer className="sticky bg-neutral-100 text-center text-neutral-600 lg:text-left">
      <div className="px-8 mb-3 md:container mx-auto md:py-5 text-center md:text-left">
        <div className="flex justify-between">
          <FooterAbout />
          <FooterContact />
          <FooterMap />
        </div>
      </div>
      <div className="bg-neutral-200 p-3 text-center">
        <span className="uppercase">© 2024 bản quyền thuộc công ty Decorpic</span>
      </div>
    </footer>
  );
}

export default Footer;
