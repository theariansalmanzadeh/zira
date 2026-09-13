"use client"

import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import QuickAccessCard, { QuickAccessCardContent, QuickAccessCardItem, QuickAccessCardList } from '@/src/shared/components/quickAccessCard'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import Header from './components/Header'
import { TABLE_COLOUMN } from './constants'

type QuickAccessStat = {
    label: string
    value: string
    href?: string
}

const QUICK_ACCESS_ITEMS: QuickAccessStat[] = [
    { label: 'انبارهای مربوطه', value: '8 انبار' },
    { label: 'کالاهای مجاز', value: '214 کالا' },
    { label: 'حساب های بانکی', value: '2 حساب' },
    { label: 'دستگاه های POS', value: '8 دستگاه' },
    { label: 'صندوق ها', value: '8 صندوق' },
    { label: 'افراد', value: '11 نفر' },
    { label: 'مجوزها', value: '3 مجوز' },
]

const SectionDivider = () => (
    <hr className='border-0 border-t border-dashed border-outline-variant' />
)

const BranchDetails = () => {
    return (
        <div dir='rtl'>
            <Header />
            <div className='flex flex-col gap-6 h-full'>
                <div className='bg-surface-container-lowest rounded-card-md p-6'>
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 py-6'>
                        <div className='flex flex-col gap-1 text-right'>
                            <span className='text-label-md text-outline'>مسئول شعبه</span>
                            <div className='flex flex-row items-center gap-2'>
                                <Avatar size='sm'>
                                    <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                        ر
                                    </AvatarFallback>
                                </Avatar>
                                <span className='text-label-lg text-on-surface-variant'>رضا کاظمی</span>
                            </div>
                        </div>
                        <InfoCardField label='تعداد اقلام' value='8,240 قلم' />
                        <InfoCardField label='متراژ' value='450 متر مربع' />
                        <InfoCardField label='موجودی' value='2.9 میلیارد تومان' />
                        <InfoCardField label='وضعیت بیمه' value='معتبر تا 1404/10' />
                    </div>
                    <SectionDivider />
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-5 py-6'>
                        <InfoCardField label='شماره تماس' value='+98 912 2571 928' />
                        <InfoCardField
                            label='آدرس'
                            value='تهران، پاسداران، اطلس مال، طبقه 11، پلاک 10'
                            className='col-span-2'
                        />
                    </div>
                    <SectionDivider />
                    <div
                        className='pt-6'
                    >
                        <QuickAccessCard>
                            <QuickAccessCardContent>
                                <QuickAccessCardList className='gap-2'>
                                    {QUICK_ACCESS_ITEMS.map((item) => (
                                        <QuickAccessCardItem key={item.label} {...item} className='max-w-[186px]' />
                                    ))}
                                </QuickAccessCardList>
                            </QuickAccessCardContent>
                        </QuickAccessCard>
                    </div>
                </div>
                <div className='mt-auto'>
                    <TableListLayout
                        TableColoumn={TABLE_COLOUMN}
                        value='products'
                        toggleButtonValue={ROUTE_CONFIGS.branchDetails.TOGGLE_BUTTON_VALUE}
                    >
                        <div className='rounded-card-lg bg-surface-container-high p-2'>
                            <Table className='border-collapse border-spacing-y-4'>
                                <TableHeader />
                                <TableBody>
                                    <TableRow data={{
                                        productName: 'محصول 1',
                                        imgUrl: 'https://via.placeholder.com/150',
                                        code: '1234567890',
                                        brand: 'برند 1',
                                        category: 'دسته بندی 1',
                                        stockInfo: '100'
                                    }} />
                                </TableBody>
                            </Table>
                        </div>
                    </TableListLayout>
                </div>
            </div>
        </div >
    )
}

export default BranchDetails
