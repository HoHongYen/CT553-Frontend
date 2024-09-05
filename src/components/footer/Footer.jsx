import FooterAbout from "@/components/footer/FooterAbout";
import FooterContact from "@/components/footer/FooterContact";
import FooterMap from "@/components/footer/FooterMap";

function Footer() {
  return (
    <footer className="bg-[var(--color-grey-100)] text-center text-[var(--color-grey-800)] lg:text-left">
      <div className="px-8 mb-3 md:container mx-auto md:py-5 text-center md:text-left">
        <div className="flex justify-between">
          <FooterAbout />
          <FooterContact />
          <FooterMap />
        </div>
      </div>
      <div className="bg-[var(--color-grey-300)] p-3 text-center">
        <span className="uppercase">
          © 2024 bản quyền thuộc công ty Decorpic
        </span>
      </div>
    </footer>
  );
}

export default Footer;
