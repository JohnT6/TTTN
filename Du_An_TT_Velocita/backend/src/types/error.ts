export interface ErrorWithWStatus extends Error {
    status?: number
}