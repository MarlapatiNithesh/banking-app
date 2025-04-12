import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { loggedInUser } from "@/components/user.controller";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function RootLayout({ children }) {
  const loggedIn=await loggedInUser()
  if(!loggedIn) redirect('/sign-in')
  return (
    <main className="flex h-screen w-full font-inter">
       <SideBar user={loggedIn} />
       <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30}/>
            <div>
              <MobileNav user={loggedIn} />
            </div>
          </div>
          {children}
       </div>
        
    </main>
  );
}
