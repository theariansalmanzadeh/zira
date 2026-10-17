'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import CheckboxDropdown from '@/src/shared/components/ui/CheckboxDropdown'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useListAttributes } from '@/src/routes/catalog/hooks/catalog'
import type { AttributeOut } from '@/src/api/types/admin/catalog'
import { useCreateProducts } from '../../provider/createProductsProvider'
import {
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    isColorAttribute,
    isMultiAttribute,
    isSelectableAttribute,
    toAttributeOptions,
} from '../../utils/attributes'

const PRESET_ATTRIBUTE_CODES = ['material', 'pack', 'unit', 'color'] as const

const AttributesTab = () => {
    const { push } = useRouter()
    const { data } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)
    const {
        attributeSelections,
        setAttributeSelection,
        setColors,
        setPacks,
        setSalesUnit,
    } = useCreateProducts()

    const attributes = useMemo(
        () =>
            [...(data?.results ?? [])]
                .filter(isSelectableAttribute)
                .sort((left, right) => left.sort_order - right.sort_order),
        [data]
    )

    useEffect(() => {
        for (const attribute of attributes) {
            if (
                !PRESET_ATTRIBUTE_CODES.includes(
                    attribute.code as (typeof PRESET_ATTRIBUTE_CODES)[number]
                ) ||
                attributeSelections[attribute.id]
            ) {
                continue
            }

            const values = (attribute.values ?? []).map((item) => item.id)
            setAttributeSelection(attribute.id, {
                name: attribute.name,
                code: attribute.code,
                values,
            })
            if (attribute.code === 'color') setColors(values)
            if (attribute.code === 'pack') setPacks(values)
            if (attribute.code === 'unit') setSalesUnit(values[0] ?? '')
        }
    }, [
        attributes,
        attributeSelections,
        setAttributeSelection,
        setColors,
        setPacks,
        setSalesUnit,
    ])

    const applySelection = (attribute: AttributeOut, values: string[]) => {
        setAttributeSelection(attribute.id, {
            name: attribute.name,
            code: attribute.code,
            values,
        })
        if (attribute.code === 'color' || isColorAttribute(attribute)) {
            setColors(values)
        }
        if (attribute.code === 'pack') setPacks(values)
        if (attribute.code === 'unit') setSalesUnit(values[0] ?? '')
    }

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='grid grid-cols-2 gap-6'>
                {attributes.map((attribute) => {
                    const options = toAttributeOptions(attribute)
                    const selected = attributeSelections[attribute.id]?.values ?? []

                    if (isMultiAttribute(attribute)) {
                        return (
                            <CheckboxDropdown
                                key={attribute.id}
                                label={attribute.name}
                                options={options}
                                values={selected}
                                onChange={(values) =>
                                    applySelection(attribute, values)
                                }
                            />
                        )
                    }

                    return (
                        <FormDropdown
                            key={attribute.id}
                            label={attribute.name}
                            placeholder='انتخاب'
                            value={selected[0]}
                            options={options}
                            onChange={(value) =>
                                applySelection(attribute, value ? [value] : [])
                            }
                        />
                    )
                })}
            </div>
            <Button
                type='button'
                variant='outline'
                className='w-fit border-primary text-primary'
                onClick={() => push('/admin/catalog/variable/new')}
            >
                افزودن ویژگی
            </Button>
        </div>
    )
}

export default AttributesTab
