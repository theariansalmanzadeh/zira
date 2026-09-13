import * as React from 'react'
import { cn } from '@shared/libs/utils'

function Seperator({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="seperator"
            className={cn(
                'border-0 border-t-[1.5px] border-dashed border-outline',
                className
            )}
            {...props}
        />
    )
}

export { Seperator }
export default Seperator
