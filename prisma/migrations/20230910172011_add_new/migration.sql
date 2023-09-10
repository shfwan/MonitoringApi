/*
  Warnings:

  - The primary key for the `Kehadiran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lokasi` on the `Kehadiran` table. All the data in the column will be lost.
  - The primary key for the `recordKehadiran` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "recordKehadiran" DROP CONSTRAINT "recordKehadiran_kehadiranId_fkey";

-- AlterTable
ALTER TABLE "Kehadiran" DROP CONSTRAINT "Kehadiran_pkey",
DROP COLUMN "lokasi",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Kehadiran_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Kehadiran_id_seq";

-- AlterTable
ALTER TABLE "Lokasi" ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "recordKehadiran" DROP CONSTRAINT "recordKehadiran_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "kehadiranId" SET DATA TYPE TEXT,
ADD CONSTRAINT "recordKehadiran_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "recordKehadiran_id_seq";

-- CreateTable
CREATE TABLE "Kendaraan" (
    "id" VARCHAR(36) NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "platNomor" TEXT NOT NULL,
    "jenis" TEXT,
    "merek" TEXT,
    "warna" TEXT,

    CONSTRAINT "Kendaraan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lokasiKendaraan" (
    "id" VARCHAR(36) NOT NULL,
    "kendaraanId" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "lokasiKendaraan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lokasiKehadiran" (
    "id" VARCHAR(36) NOT NULL,
    "kehadiranId" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "lokasiKehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lokasiKendaraan_kendaraanId_key" ON "lokasiKendaraan"("kendaraanId");

-- CreateIndex
CREATE UNIQUE INDEX "lokasiKehadiran_kehadiranId_key" ON "lokasiKehadiran"("kehadiranId");

-- AddForeignKey
ALTER TABLE "lokasiKendaraan" ADD CONSTRAINT "lokasiKendaraan_kendaraanId_fkey" FOREIGN KEY ("kendaraanId") REFERENCES "Kendaraan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lokasiKehadiran" ADD CONSTRAINT "lokasiKehadiran_kehadiranId_fkey" FOREIGN KEY ("kehadiranId") REFERENCES "Kehadiran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordKehadiran" ADD CONSTRAINT "recordKehadiran_kehadiranId_fkey" FOREIGN KEY ("kehadiranId") REFERENCES "Kehadiran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
