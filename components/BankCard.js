import Link from "next/link"
import Image from "next/image"

const BankCard = ({ account, userName, showBalance = true }) => {
  return (
    <div className="flex flex-col">
      <Link href="/" className="bank-card">
        <div className="bank-card_content">
          <div>
            <h2 className="text-16 font-semibold text-white">
              {account?.name || userName}
            </h2>
            <p className="font-ibm-plex-serif font-black text-white">
              {showBalance &&
                account?.currentBalance?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
            </p>
          </div>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
                <h1 className="text-12 font-semibold text-white">{userName}</h1>
                <h2 className="text-12 font-semibold text-white">●●/●●</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
            ●●●● ●●●● ●●●● <span className="text-16">1234</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon">
            <Image 
                src="/icons/paypass.svg"
                alt="bank card icon"
                width={20}
                height={24}
            />
            <Image 
                src="/icons/mastercard.svg"
                alt="bank card icon"
                width={45}
                height={32}
                className="ml-5"
            />
        </div>
        <Image
           src="/icons/lines.png"
              alt="bank card design"
              width={316}
              height={190}
              className="absolute top-0 left-0"
        />
      </Link>
    </div>
  )
}

export default BankCard
