-- CreateTable
CREATE TABLE "Supir" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "alamat" TEXT,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Supir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "supirId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT DEFAULT 'User',
    "token" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" VARCHAR(36) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Administrator',
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waktu" (
    "id" VARCHAR(36) NOT NULL,
    "authorId" TEXT NOT NULL,
    "jamMasuk" TEXT DEFAULT '02:00',
    "jamPulang" TEXT DEFAULT '17:00',
    "jamLembur" TEXT DEFAULT '20:00',
    "batasTerlambat" TEXT DEFAULT '08:30',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waktu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lokasi" (
    "id" VARCHAR(36) NOT NULL,
    "authorId" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lokasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" VARCHAR(36) NOT NULL,
    "userId" TEXT NOT NULL,
    "foto" TEXT,
    "bio" TEXT,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kehadiran" (
    "id" SERIAL NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "statusHadir" BOOLEAN DEFAULT false,
    "statusIzin" BOOLEAN DEFAULT false,
    "statusSakit" BOOLEAN DEFAULT false,
    "description" TEXT,
    "fotoKeterangan" TEXT,
    "tanggal" TEXT,
    "jamMasuk" TEXT,
    "jamPulang" TEXT,
    "lokasi" TEXT,

    CONSTRAINT "Kehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recordKehadiran" (
    "id" SERIAL NOT NULL,
    "kehadiranId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recordKehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_supirId_key" ON "User"("supirId");

-- CreateIndex
CREATE UNIQUE INDEX "Waktu_authorId_key" ON "Waktu"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Lokasi_authorId_key" ON "Lokasi"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_userId_key" ON "userProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Kehadiran_userProfileId_key" ON "Kehadiran"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "recordKehadiran_kehadiranId_key" ON "recordKehadiran"("kehadiranId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_supirId_fkey" FOREIGN KEY ("supirId") REFERENCES "Supir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waktu" ADD CONSTRAINT "Waktu_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lokasi" ADD CONSTRAINT "Lokasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kehadiran" ADD CONSTRAINT "Kehadiran_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordKehadiran" ADD CONSTRAINT "recordKehadiran_kehadiranId_fkey" FOREIGN KEY ("kehadiranId") REFERENCES "Kehadiran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
