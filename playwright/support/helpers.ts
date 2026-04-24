export function generateOrderId(): string {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    const randomChars = (length: number) =>
        Array.from({ length }, () =>
            alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
        ).join('')

    return `VLO-${randomChars(6)}`
}