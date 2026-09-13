export { ADD_PRODUCT_TABS, type AddProductTabValue } from '../../constants'
export { default as AdditionalSettingsTab } from './AdditionalSettingsTab'
export { default as AttributesTab } from './AttributesTab'
export { default as BasicInfoTab } from './basicInfoTab'
export { default as GalleryTab } from './GalleryTab'
export { default as InventoryTab } from './InventoryTab'
export { default as PricingTab } from './pricingTab'
export { default as ReviewTab } from './ReviewTab'

import AdditionalSettingsTab from './AdditionalSettingsTab'
import AttributesTab from './AttributesTab'
import BasicInfoTab from './basicInfoTab'
import { type AddProductTabValue } from '../../constants'
import GalleryTab from './GalleryTab'
import InventoryTab from './InventoryTab'
import PricingTab from './pricingTab'
import ReviewTab from './ReviewTab'

export const TAB_CONTENT: Record<AddProductTabValue, React.ComponentType> = {
    'basic-info': BasicInfoTab,
    attributes: AttributesTab,
    gallery: GalleryTab,
    pricing: PricingTab,
    inventory: InventoryTab,
    'additional-settings': AdditionalSettingsTab,
    review: ReviewTab,
}
