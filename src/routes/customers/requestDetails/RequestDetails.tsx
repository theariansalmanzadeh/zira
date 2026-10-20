'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import type { RegistrationRequest } from '@/src/api/types/admin/customers'
import type { Guarantee } from '@/src/api/types/admin/customerDetails'
import { useListCustomerGuarantees } from '@/src/routes/customers/hooks/customerDetails'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { Spinner } from '@/src/shared/components/ui/spinner'
import CreditDocumentCard from './components/CreditDocumentCard'
import DecisionCard from './components/DecisionCard'
import DocumentVerificationCard from './components/DocumentVerificationCard'
import ExpertAllocationsCard from './components/ExpertAllocationsCard'
import UploadedDocuments from './components/UploadedDocuments'
import {
    DOCUMENT_VERIFICATION_DUMMY,
    type CreditDocumentData,
    type DocumentVerificationData,
} from './constants'
import { useGetRegistrationRequest } from '../hooks/customers'

const displayText = (value?: string | null) =>
    value == null || value.trim() === '' ? '-' : value

const toCreditDocument = (
    guarantee: Guarantee,
    index: number
): CreditDocumentData => {
    const isCheque = guarantee.guarantee_type === 'PERSONAL_CHEQUE'
    const dueDate = guarantee.due_date ? formatFaDate(guarantee.due_date) : '-'

    return {
        id: guarantee.id,
        index,
        typeLabel: isCheque ? 'چک شخصی' : 'سفته',
        typeTone: isCheque ? 'primary' : 'warning',
        amount: Number(guarantee.amount) || 0,
        creditLabel: 'ضمانت',
        status:
            guarantee.status === 'ACTIVE'
                ? 'active'
                : guarantee.status === 'RELEASED'
                  ? 'released'
                  : 'pending',
        fields: isCheque
            ? [
                  {
                      label: 'شماره چک (صیادی)',
                      value: displayText(guarantee.document_no),
                  },
                  {
                      label: 'شعبه',
                      value: displayText(guarantee.bank_branch_name),
                  },
                  {
                      label: 'صاحب حساب',
                      value: displayText(guarantee.owner_name),
                  },
                  { label: 'تاریخ سررسید', value: dueDate },
              ]
            : [
                  {
                      label: 'شماره سفته',
                      value: displayText(guarantee.document_no),
                  },
                  {
                      label: 'نام ضامن',
                      value: displayText(guarantee.guarantor_name),
                  },
                  {
                      label: 'کد ملی ضامن',
                      value: displayText(guarantee.guarantor_national_id),
                  },
                  { label: 'تاریخ سررسید', value: dueDate },
                  {
                      label: 'محل تنظیم',
                      value: displayText(guarantee.issue_place),
                  },
              ],
    }
}

const mapRegistrationToVerificationData = (
    request?: RegistrationRequest | null
): DocumentVerificationData => {
    if (!request) return DOCUMENT_VERIFICATION_DUMMY

    const sub = (request.submitted_data || {}) as Record<string, unknown>
    const fullName =
        request.full_name ||
        [sub.first_name, sub.last_name]
            .filter((v): v is string => Boolean(v && typeof v === 'string'))
            .join(' ') ||
        (typeof sub.full_name === 'string' ? sub.full_name : '') ||
        (typeof sub.manager_name === 'string' ? sub.manager_name : '') ||
        request.customer_store_name ||
        DOCUMENT_VERIFICATION_DUMMY.fullName

    const formatGender = (val: unknown) => {
        if (typeof val !== 'string' || !val) {
            return DOCUMENT_VERIFICATION_DUMMY.gender
        }
        const upper = val.toUpperCase()
        if (upper === 'MALE' || upper === 'MAN') return 'مرد'
        if (upper === 'FEMALE' || upper === 'WOMAN') return 'زن'
        return val
    }

    return {
        fullName: fullName || DOCUMENT_VERIFICATION_DUMMY.fullName,
        gender: formatGender(sub.gender),
        username:
            (typeof sub.username === 'string' && sub.username) ||
            (typeof sub.requested_username === 'string' &&
                sub.requested_username) ||
            DOCUMENT_VERIFICATION_DUMMY.username,
        nationalId:
            (typeof sub.national_id === 'string' && sub.national_id) ||
            (typeof sub.nationalId === 'string' && sub.nationalId) ||
            (typeof sub.national_code === 'string' && sub.national_code) ||
            DOCUMENT_VERIFICATION_DUMMY.nationalId,
        licenseNumber:
            (typeof sub.business_license_no === 'string' &&
                sub.business_license_no) ||
            (typeof sub.license_number === 'string' && sub.license_number) ||
            (typeof sub.licenseNumber === 'string' && sub.licenseNumber) ||
            DOCUMENT_VERIFICATION_DUMMY.licenseNumber,
        mobile1:
            request.mobile ||
            (typeof sub.mobile === 'string' && sub.mobile) ||
            DOCUMENT_VERIFICATION_DUMMY.mobile1,
        mobile2:
            (typeof sub.mobile_2 === 'string' && sub.mobile_2) ||
            (typeof sub.mobile2 === 'string' && sub.mobile2) ||
            DOCUMENT_VERIFICATION_DUMMY.mobile2,
        phone:
            (typeof sub.phone === 'string' && sub.phone) ||
            DOCUMENT_VERIFICATION_DUMMY.phone,
        referrerName:
            (typeof sub.referrer_name === 'string' && sub.referrer_name) ||
            (typeof sub.referrerName === 'string' && sub.referrerName) ||
            DOCUMENT_VERIFICATION_DUMMY.referrerName,
        address:
            (typeof sub.address === 'string' && sub.address) ||
            [sub.province, sub.city, sub.address]
                .filter((v): v is string => Boolean(v && typeof v === 'string'))
                .join('، ') ||
            DOCUMENT_VERIFICATION_DUMMY.address,
    }
}

const RequestDetails = () => {
    const params = useParams<{ id: string }>()
    const requestId = params.id ?? ''

    const {
        data: request,
        isPending,
        isError,
    } = useGetRegistrationRequest(requestId, Boolean(requestId))
    const customerId = request?.customer_id ?? ''
    const {
        data: guaranteesPage,
        isLoading: isGuaranteesLoading,
    } = useListCustomerGuarantees(customerId, undefined, Boolean(customerId))
    const creditDocuments = useMemo(
        () =>
            (guaranteesPage?.results ?? []).map((guarantee, index) =>
                toCreditDocument(guarantee, index + 1)
            ),
        [guaranteesPage]
    )

    const verificationData = useMemo(
        () => mapRegistrationToVerificationData(request),
        [request]
    )

    const isPendingStatus = request ? request.status === 'PENDING' : true

    if (isPending) {
        return (
            <div
                className="flex justify-center rounded-card-md bg-surface-container-lowest p-6"
                dir="rtl"
            >
                <Spinner className="size-6 text-outline" />
            </div>
        )
    }

    if (isError) {
        return (
            <div
                className="rounded-card-md bg-surface-container-lowest p-6 text-center text-label-md text-outline"
                dir="rtl"
            >
                دریافت اطلاعات درخواست با خطا مواجه شد.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2" dir="rtl">
            <div className="flex flex-col gap-4">
                <DocumentVerificationCard data={verificationData} />
                {isGuaranteesLoading ? (
                    <div className="flex justify-center rounded-card-md bg-surface-container-lowest p-6">
                        <Spinner className="size-6 text-outline" />
                    </div>
                ) : (
                    creditDocuments.map((document) => (
                        <CreditDocumentCard
                            key={document.id}
                            data={document}
                        />
                    ))
                )}
                <UploadedDocuments requestId={requestId} />
            </div>
            <div className="flex flex-col gap-4">
                <ExpertAllocationsCard
                    customerId={customerId}
                    status={request?.status}
                />
                {isPendingStatus && <DecisionCard />}
            </div>
        </div>
    )
}

export default RequestDetails
