-- CreateEnum
CREATE TYPE "estado_tarea" AS ENUM ('pendiente', 'progreso', 'completada');

-- CreateEnum
CREATE TYPE "prioridad_tarea" AS ENUM ('baja', 'media', 'alta');

-- CreateTable
CREATE TABLE "comentario" (
    "id" TEXT NOT NULL,
    "tareaId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarea" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "estado_tarea" NOT NULL DEFAULT 'pendiente',
    "prioridad" "prioridad_tarea" NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asignadoId" TEXT,

    CONSTRAINT "tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoURL" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarea" ADD CONSTRAINT "tarea_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarea" ADD CONSTRAINT "tarea_asignadoId_fkey" FOREIGN KEY ("asignadoId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
