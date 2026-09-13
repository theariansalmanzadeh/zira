export type Status = "active" | "diactive" | "pending"

type StatusConfig = {
    variant: "success" | "warning" | "tonal"
    text: string
    icon: string
}

export const statusType = (status: Status): StatusConfig => {
    if (status === "active") {
        return { variant: "success", text: "فعال", icon: "checkCircle" }
    } else if (status === "diactive") {
        return { variant: "warning", text: "غیرفعال", icon: "cross" }
    } else if (status === "pending") {
        return { variant: "tonal", text: "در حال بررسی", icon: "clockDashed" }
    }
    return { variant: "tonal", text: "در انتظار تایید", icon: "clockDashed" }
}
