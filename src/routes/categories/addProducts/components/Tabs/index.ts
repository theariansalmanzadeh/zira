export { ADD_PRODUCT_TABS, type AddProductTabValue } from '../../constants'
export { default as AttributesTab } from './AttributesTab'
export { default as BasicInfoTab } from './basicInfoTab'
export { default as PricingTab } from './pricingTab'

import AttributesTab from './AttributesTab'
import BasicInfoTab from './basicInfoTab'
import { type AddProductTabValue } from '../../constants'
import PricingTab from './pricingTab'

export const TAB_CONTENT: Record<AddProductTabValue, React.ComponentType> = {
    'basic-info': BasicInfoTab,
    attributes: AttributesTab,
    pricing: PricingTab,
}
