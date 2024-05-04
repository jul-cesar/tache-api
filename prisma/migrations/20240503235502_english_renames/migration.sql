/*
  Warnings:

  - You are about to drop the column `nombre` on the `team` table. All the data in the column will be lost.
  - You are about to drop the `comentario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarea` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_tareaId_fkey";

-- DropForeignKey
ALTER TABLE "tarea" DROP CONSTRAINT "tarea_asignadoId_fkey";

-- DropForeignKey
ALTER TABLE "tarea" DROP CONSTRAINT "tarea_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "tarea" DROP CONSTRAINT "tarea_teamId_fkey";

-- AlterTable
ALTER TABLE "team" DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "comentario";

-- DropTable
DROP TABLE "tarea";

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "estado_tarea" NOT NULL DEFAULT 'pendiente',
    "priority" "prioridad_tarea" NOT NULL,
    "expiringDate" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asignedId" TEXT,
    "teamId" TEXT,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_asignedId_fkey" FOREIGN KEY ("asignedId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
