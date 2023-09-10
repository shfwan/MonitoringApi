import {
    get,
    hadir,
    pulang,
    sakit,
    izin,
} from "../model/kehadiran.model.js"

export const getApiTime = async () => {
    const apiUrl = "http://worldtimeapi.org/api/timezone/Asia/Jayapura"

    const response = await (fetch(apiUrl))
    
    const data = await response.json()
    const formatDate = (data.datetime).toString()

    const date = formatDate.slice(0,10)
    const time = formatDate.slice(11,19)

    return ({
        date: date,
        time: time
    })
}


const getKehadiranService = async () => {
    return await get()
}

const hadirService = async (request) => {
    return await hadir(request, await getApiTime())
}

const pulangService = async (request) => {
    return await pulang(request, await getApiTime())
}

const sakitService = async (request) => {
    return await sakit(request, await getApiTime())
}

const izinService = async (request) => {
    return await izin(request, await getApiTime())
}

export {
    hadirService,
    pulangService,
    sakitService,
    izinService,
    getKehadiranService
}