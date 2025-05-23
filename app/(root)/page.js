import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { loggedInUser } from "@/components/user.controller";

const Home =async () => {
  const loggedIn = await loggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcom"
            user={loggedIn}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar
      user={loggedIn}
       transactions={[]}
       banks={[{currentBalance:1235.35},{currentBalance:1235.35}]}
      />
    </section>
  );
};

export default Home;
