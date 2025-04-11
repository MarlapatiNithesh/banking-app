"use client";

import CountUp from "react-countup"

const Animator = ({amount}) => {
  return (
    <div className="w-full">
        <CountUp
            start={0}
            end={amount}
            duration={1}
            separator=","
            decimal="."
            decimals={2}
            prefix="₹ "
            className="text-3xl font-semibold"
        />
    </div>
  )
}

export default Animator