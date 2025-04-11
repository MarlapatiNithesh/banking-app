
import Animator from "./Animator"
import BankDoughnutChart from "./Doughnut"


const TotalBalanceBox = ({
    accounts=[],
    totalBanks,
    totalCurrentBalance,
}) => {
  return (
    <section className="total-balance">
        <div className="total-balance-chart">
            {/* Doughnut charts */}
            <BankDoughnutChart accounts={accounts} />
        </div>
        <div className="flex flex-col gap-6 ">
            <h2 className="header-2">
                {totalBanks} Bank Accounts

            </h2>
            <div className="flex flex-col gap-2">
                <p className="total-balance-label">Total Balance Amount</p>
                <div className="total-balance-amount flex-center gap-2 no-underline">
                    <Animator amount={totalCurrentBalance} />
                </div>
            </div>
        </div>
        <div>

        </div>
    </section>

  )
}

export default TotalBalanceBox