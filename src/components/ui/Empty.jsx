import { HiInbox } from "react-icons/hi2"

function Empty({ description }) {
    return (
        <div className="my-5 flex flex-col gap-5 items-center justify-center">
            <HiInbox className="text-[5rem] text-[var(--color-grey-400)]" />
            <h2 className="text-2xl text-[var(--color-grey-400)]">{description}</h2>
        </div>
    )
}

export default Empty
