import Image from "next/image";
import { logout } from "./user.controller";
import { useRouter } from "next/navigation";
const Footer = ({ user = {}, type = "desktop" }) => {
    const formatName = (name = "") =>
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  
    const firstNameInitial = formatName(user.firstName)?.charAt(0) || "";
    const router = useRouter()

    const handleLogout = async () => {
        const loggedout = await logout();
        if(loggedout){
            router.push('/sign-in')
        }
    }
  
    return (
      <footer className="footer">
        <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
          <p className="text-xl font-bold text-gray-700">{firstNameInitial}</p>
        </div>
  
        <div
          className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
        >
          <h1 className="text-14 truncate text-gray-600 font-semibold">
            {formatName(user.firstName)} {formatName(user.lastName)}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600">
            {user.email}
          </p>
        </div>
        <div className={type==='mobile'?'footer_image-mobile':'footer_image'} onClick={handleLogout}>
            <Image src='/icons/logout.svg' fill alt="logout" />
        </div>
      </footer>
    );
  };
  
  export default Footer;
  