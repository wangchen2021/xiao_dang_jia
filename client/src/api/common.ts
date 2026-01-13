import { getRequest } from "./request"

export interface GetCosSTSRes {
    tmpSecretId: string,
    tmpSecretKey: string,
    sessionToken: string,
    expiredTime: number
}

export const getCosSTS = () => {
    return getRequest<GetCosSTSRes>("/cos/sts")
}