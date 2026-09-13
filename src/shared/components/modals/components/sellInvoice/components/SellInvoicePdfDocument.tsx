import {
    Document,
    Font,
    Page,
    Path,
    StyleSheet,
    Svg,
    Text,
    View,
} from '@react-pdf/renderer'
import { ICON_PATHS } from '@/src/shared/components/Icons/generated/iconPaths'
import { formatFaDate, formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import type { SellInvoiceData } from '../types'

Font.register({
    family: 'Vazirmatn',
    fonts: [
        {
            src: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Regular.ttf',
            fontWeight: 400,
        },
        {
            src: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Bold.ttf',
            fontWeight: 700,
        },
    ],
})

Font.registerHyphenationCallback((word) => [word])

const currencyIcon = ICON_PATHS.currency

const CurrencyIcon = ({
    color = '#49454f',
    size = 10,
}: {
    color?: string
    size?: number
}) => (
    <Svg viewBox={currencyIcon.viewBox} width={size} height={size}>
        {currencyIcon.paths.map((d) => (
            <Path key={d} d={d} fill={color} />
        ))}
    </Svg>
)

type AmountWithCurrencyProps = {
    value: number
    prefix?: string
    color?: string
    fontSize?: number
    fontWeight?: number
    iconSize?: number
}

const AmountWithCurrency = ({
    value,
    prefix = '',
    color = '#49454f',
    fontSize = 10,
    fontWeight = 700,
    iconSize = 10,
}: AmountWithCurrencyProps) => (
    <View style={styles.amountRow}>
        <Text style={{ fontSize, fontWeight, color }}>
            {prefix}
            {formatPrice(value)}
        </Text>
        <CurrencyIcon color={color} size={iconSize} />
    </View>
)

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Vazirmatn',
        padding: 28,
        backgroundColor: '#ffffff',
        direction: 'rtl',
    },
    cardsRow: {
        flexDirection: 'row-reverse',
        gap: 12,
        marginBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 14,
    },
    label: {
        fontSize: 10,
        color: '#777777',
        marginBottom: 6,
        textAlign: 'right',
    },
    title: {
        fontSize: 14,
        fontWeight: 700,
        color: '#1c1b1f',
        textAlign: 'right',
        marginBottom: 4,
    },
    text: {
        fontSize: 10,
        color: '#49454f',
        textAlign: 'right',
        marginBottom: 2,
    },
    metaRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    metaLabel: {
        fontSize: 10,
        color: '#777777',
    },
    metaValue: {
        fontSize: 10,
        fontWeight: 700,
        color: '#49454f',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 700,
        color: '#1c1b1f',
        textAlign: 'right',
        marginBottom: 8,
    },
    table: {
        borderWidth: 1,
        borderColor: '#cac4d0',
        borderRadius: 12,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row-reverse',
        backgroundColor: '#e7e0ec',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    tableRow: {
        flexDirection: 'row-reverse',
        borderTopWidth: 1,
        borderTopColor: '#e7e0ec',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    th: {
        fontSize: 9,
        fontWeight: 700,
        color: '#777777',
        textAlign: 'right',
    },
    td: {
        fontSize: 10,
        color: '#49454f',
        textAlign: 'right',
    },
    tdBold: {
        fontSize: 10,
        fontWeight: 700,
        color: '#1c1b1f',
        textAlign: 'right',
    },
    colRow: { width: '10%' },
    colName: { width: '40%' },
    colQty: { width: '12%', textAlign: 'center' },
    colUnit: { width: '19%', alignItems: 'flex-start' },
    colAmount: { width: '19%', alignItems: 'flex-start' },
    amountRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 3,
    },
    totals: {
        marginTop: 14,
        gap: 6,
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    totalLabel: {
        fontSize: 10,
        color: '#777777',
    },
    payableLabel: {
        fontSize: 12,
        fontWeight: 700,
        color: '#1c1b1f',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#cac4d0',
        paddingBottom: 6,
        marginBottom: 4,
    },
})

type SellInvoicePdfDocumentProps = {
    data: SellInvoiceData
}

const SellInvoicePdfDocument = ({ data }: SellInvoicePdfDocumentProps) => {
    const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0)
    const taxable = Math.max(subtotal - data.discount, 0)
    const tax = Math.round(taxable * 0.09)
    const payable = taxable + tax

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.cardsRow}>
                    <View style={styles.card}>
                        <Text style={styles.label}>صورتحساب برای</Text>
                        <Text style={styles.title}>{data.customerName}</Text>
                        <Text style={styles.text}>{data.customerCode}</Text>
                        <Text style={styles.text}>{data.address}</Text>
                        <Text style={styles.text}>{data.phone}</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>تاریخ ثبت</Text>
                            <Text style={styles.metaValue}>
                                {formatFaDate(data.registeredAt)}
                            </Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>نحوه تسویه</Text>
                            <Text style={styles.metaValue}>{data.settlementLabel}</Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>تاریخ تسویه</Text>
                            <Text style={styles.metaValue}>
                                {formatFaDate(data.settledAt)}
                            </Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaLabel}>تعداد اقلام</Text>
                            <Text style={styles.metaValue}>
                                {formatFaNumber(data.items.length)} قلم
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>جزئیات سفارش</Text>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.th, styles.colRow]}>ردیف</Text>
                        <Text style={[styles.th, styles.colName]}>شرح کالا</Text>
                        <Text style={[styles.th, styles.colQty]}>تعداد</Text>
                        <Text style={[styles.th, styles.colUnit]}>فی واحد</Text>
                        <Text style={[styles.th, styles.colAmount]}>مبلغ کل</Text>
                    </View>

                    {data.items.map((item) => (
                        <View key={item.row} style={styles.tableRow}>
                            <Text style={[styles.td, styles.colRow]}>
                                {formatFaNumber(item.row)}
                            </Text>
                            <Text style={[styles.tdBold, styles.colName]}>
                                {item.name}
                            </Text>
                            <Text style={[styles.td, styles.colQty]}>
                                {formatFaNumber(item.qty)}
                            </Text>
                            <View style={styles.colUnit}>
                                <AmountWithCurrency
                                    value={item.unitPrice}
                                    color="#49454f"
                                    fontWeight={400}
                                />
                            </View>
                            <View style={styles.colAmount}>
                                <AmountWithCurrency
                                    value={item.amount}
                                    color="#1c1b1f"
                                />
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.totals}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>جمع جزء</Text>
                        <AmountWithCurrency value={subtotal} />
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>تخفیف</Text>
                        <AmountWithCurrency
                            value={data.discount}
                            prefix="-"
                            color="#6750a4"
                        />
                    </View>
                    <View style={[styles.totalRow, styles.divider]}>
                        <Text style={styles.totalLabel}>
                            مالیات بر ارزش افزوده (۹٪)
                        </Text>
                        <AmountWithCurrency value={tax} />
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.payableLabel}>مبلغ قابل پرداخت</Text>
                        <AmountWithCurrency
                            value={payable}
                            color="#6750a4"
                            fontSize={12}
                            iconSize={12}
                        />
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default SellInvoicePdfDocument
