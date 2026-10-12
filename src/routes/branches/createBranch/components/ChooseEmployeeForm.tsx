'use client'

import { Dispatch, SetStateAction } from 'react'
import EployeeTableHeader from './EployeeTableHeader'
import EployeeTableRow from './EployeeTableRow'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useCreateBranchContext } from '../provider/CreateBranchProvider'
import type { SelectUserItem } from '@/src/shared/components/modals/components/selectUserAndGroups/types'

type ChooseEmployeeFormProps = {
    setActiveStep?: Dispatch<SetStateAction<number>>
}

const ChooseEmployeeForm = ({
    setActiveStep: propSetActiveStep,
}: ChooseEmployeeFormProps) => {
    const {
        employees,
        addEmployees,
        removeEmployee,
        updateEmployee,
        setActiveStep: contextSetActiveStep,
    } = useCreateBranchContext()

    const setActiveStep = propSetActiveStep || contextSetActiveStep
    const { openModal } = useModalStore()

    const handleOpenAddEmployeeModal = () => {
        openModal(ModalTypes.ADD_EMPLOYEE, {
            defaultTab: 'user',
            hasOnlyUsers: true,
            onSelectUser: (selectedUsers: SelectUserItem[]) => {
                addEmployees(
                    selectedUsers.map((user) => ({
                        id: user.id || user.userId,
                        name: user.userName,
                        role: user.roles || 'manager',
                        workHours: 'full_time',
                        status: user.status === 'inactive' ? 'غیرفعال' : 'فعال',
                    }))
                )
            },
        })
    }

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="flex flex-col gap-3">
                <span className="text-label-lg font-bold text-outline">
                    انتخاب کارمندان
                </span>
                <div className="w-full flex flex-col justify-center p-6 bg-surface-container-lowest rounded-card-md">
                    <div className="bg-surface-container-high rounded-card-lg p-2 flex flex-col gap-3">
                        <Table>
                            <EployeeTableHeader />
                            <TableBody>
                                {employees.map((employee) => (
                                    <EployeeTableRow
                                        key={employee.id}
                                        employee={employee}
                                        onRemove={() => removeEmployee(employee.id)}
                                        onRoleChange={(role) =>
                                            updateEmployee(employee.id, { role })
                                        }
                                        onWorkHoursChange={(workHours) =>
                                            updateEmployee(employee.id, { workHours })
                                        }
                                    />
                                ))}
                                {employees.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-6 text-label-md text-on-surface-variant"
                                        >
                                            کارمندی انتخاب نشده است.
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                        <Button
                            variant="ghost"
                            className="self-center"
                            onClick={handleOpenAddEmployeeModal}
                        >
                            <Icon
                                label="addLg400Linear"
                                className="size-4 text-on-surface-variant"
                            />
                            <span className="text-label-lg text-on-surface-variant">
                                افزودن کارمند
                            </span>
                        </Button>
                    </div>
                    <div className="mt-6 flex flex-row gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setActiveStep(2)}
                        >
                            <Icon
                                label="arrorwRight400Linear"
                                className="size-4 text-on-surface-variant"
                            />
                            <span className="text-label-lg text-on-surface-variant">
                                بازگشت
                            </span>
                        </Button>
                        <Button
                            variant="primary"
                            className="grow"
                            onClick={() => setActiveStep(4)}
                        >
                            ادامه
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseEmployeeForm
