import { validate } from "../validation/validation.js"
import prismaClient from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import { createKehadiranIzin, createKehadiranSakit } from "../validation/kehadiran.validation.js"

const get = async () => {
    return await prismaClient.kehadiran.findMany({
        include: {
            userProfile: {
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                },
            }
        }
    })
}

const setAlpa = async (datetime) => {
    const userData = await prismaClient.userProfile.findFirst({
        select: {
            id: true
        }
    })

    const hadirExist = await prismaClient.kehadiran.findFirst({
        where: {
            userProfileId: userData.id,
            tanggal: datetime.date,
            statusHadir: true
        },
        select: {
            userProfileId: true
        }
    })
    

    return userData.filter( //filter nama-nama yang tidak hadir dari data kehadiran hari ini
        itemUser => !hadirExist.some(itemHadir => (
            itemUser.id === itemHadir.userProfileId
            )
        )
    ).map(async (item) => { //membuat tidak hadir pada nama-nama yang tidak ada pada data kehadiran
        await prismaClient.kehadiran.create({
            data: {
                userProfileId: item.id,
                tanggal: datetime.date
            },
            select: true
        })
    })
    
    
}

const checkHadirExist = async (request, datetime) => {
    const findStatusHadir = await prismaClient.kehadiran.count({
        where: {
            userProfileId: request.userProfileId,
            tanggal: datetime.date,
            statusHadir: true,
        },
    })

    if (findStatusHadir === 1) {
        throw new ResponseError(401, "Hadir Exists")
    }
    
    return await prismaClient.kehadiran.findFirst({
        where: {
            userProfileId: request.userProfileId,
            tanggal: datetime.date,
            statusHadir: true,
        },
        select: {
            id: true
        }
    })
}

const checkIzinExist = async (request, datetime) => {
    const findStatusIzin = await prismaClient.kehadiran.count({
        where: {
            userProfileId: request.userProfileId,
            tanggal: datetime.date,
            statusIzin: true,
        },
    })

    if (findStatusIzin !== 0) {
        throw new ResponseError(401, "Izin Exitst")
    }
    
    return await prismaClient.kehadiran.findFirst({
        where: {
            userProfileId: request.userProfileId,
            tanggal: datetime.date,
            statusIzin: true,
        },
        select: {
            id: true
        }
    })
}

const checkSakitExist = async (request, datetime) => {
    const findStatusSakit = await prismaClient.kehadiran.count({
        where: {
            userProfileId: request.userProfileId,
            tanggal: datetime.date,
            statusSakit: true,
        },
    })

    if (findStatusSakit === 1) {
        throw new ResponseError(401, "Sakit Exitst")
    }
    
    return await prismaClient.kehadiran.findFirst({
        where: {
            userProfileId: request.userProfileId,
            tanggal: datetime.date,
            statusSakit: true,
        },
        select: {
            id: true
        }
    })
}

const hadir = async (request, datetime) => {

    userProfileId = await checkHadirExist(request, datetime)

    await prismaClient.recordKehadiran.create({
        data: {
            kehadiranId: request.id
        }
    })

    return await prismaClient.kehadiran.create({
        data: request,
        select: {
            id: true,
            statusHadir: true,
            jamMasuk: true,
            tanggal: true,
            lokasi: true,
        }
    })
}

const sakit = async (request, datetime) => {

    
    userProfileId = await checkSakitExist(request, datetime)
    const kehadiran = validate(createKehadiranSakit, request)

    if (!kehadiran) {
        throw new ResponseError(400, "Description max 500 word")
    }

    await prismaClient.recordKehadiran.create({
        data: {
            kehadiranId: request.id
        }
    })

    return await prismaClient.kehadiran.create({
        data: request,
        select: {
            id: true,
            statusSakit: true,
            description: true,
            tanggal: true,
            lokasi: true
        }
    })
}

const izin = async (request, datetime) => {
    userProfileId = await checkIzinExist(request, datetime)
    const kehadiran = validate(createKehadiranIzin, request)

    if (!kehadiran) {
        throw new ResponseError(400, "Description max 500 word")
    }

    await prismaClient.recordKehadiran.create({
        data: {
            kehadiranId: request.id
        }
    })

    return await prismaClient.kehadiran.create({
        data: request,
        select: {
            id: true,
            statusIzin: true,
            description: true,
            tanggal: true,
            lokasi: true
        }
    })
}

const pulang = async (request, datetime) => {
    userProfileId = await checkHadirExist(request, datetime)
    kehadiranData.jamPulang = datetime.date

    return await prismaClient.kehadiran.update({
        where: {
            userProfileId: userProfileId,
            statusHadir: kehadiranData.statusHadir,
            tanggal: kehadiranData,
        },
        data: request,
        select: {
            id: true,
            statusHadir: true,
            tanggal: true,
            jamPulang: true,
            lokasi: true,
        }
    })
}

export {
    get,
    hadir,
    pulang,
    sakit,
    izin,
}