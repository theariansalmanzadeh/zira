'use client'

import { useRouter } from 'next/navigation'
import VariableCard from './components/VariableCard'
import { VARIABLES_DUMMY, type VariableItem } from './constants'

type VariableProps = {
    data?: VariableItem[]
}

const Variable = ({ data = VARIABLES_DUMMY }: VariableProps) => {
    const { push } = useRouter()

    return (
        <div className="grid w-full grid-cols-2 gap-3" dir="rtl">
            {data.map((item) => (
                <VariableCard
                    key={item.id}
                    data={item}
                    onManage={() =>
                        push(`/admin/categories/variable/${item.id}/edit`)
                    }
                />
            ))}
        </div>
    )
}

export default Variable
