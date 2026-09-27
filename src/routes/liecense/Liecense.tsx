import { LICENSES_DUMMY } from '@/src/routes/contentManagment/liecenses/constants'
import { getLiecenseDetails } from '@/src/routes/contentManagment/liecenseDetails/constants'
import LiecenseCard from './components/LiecenseCard'

const Liecense = () => {
    const items = LICENSES_DUMMY.map((item) => getLiecenseDetails(item.id))

    return (
        <section
            className="flex w-full flex-col gap-6 py-10"
            dir="rtl"
        >
            <h1 className="text-title-lg font-bold text-on-surface">
                گواهی‌ها و مجوزها
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((item) => (
                    <LiecenseCard key={item.id} data={item} />
                ))}
            </div>
        </section>
    )
}

export default Liecense
