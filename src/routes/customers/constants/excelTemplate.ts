export type ExcelTemplateColumn = {
    header: string
    key: string
    width?: number
}

export const excelTemplates = {
    request: [
        { header: 'شناسه درخواست', key: 'id' },
        { header: 'مشتری', key: 'name' },
        { header: 'سطح کاربر', key: 'level' },
        { header: 'کد ملی', key: 'nationalId' },
        { header: 'شماره پروانه', key: 'licenseNumber' },
        { header: 'وضعیت', key: 'status' },
    ],
    list: [
        { header: 'نام و نام خانوادگی', key: 'name' },
        { header: 'شناسه مشتری', key: 'id' },
        { header: 'سطح کاربر', key: 'level' },
        { header: 'سقف اعتبار', key: 'credit' },
        { header: 'شماره تماس', key: 'phone' },
        { header: 'ایمیل', key: 'email' },
    ],
} satisfies Record<string, ExcelTemplateColumn[]>

export type ExcelTemplateRoute = keyof typeof excelTemplates
