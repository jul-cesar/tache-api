/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_refreshToken_key" ON "user"("refreshToken");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "user"("email");

-- CreateIndex
CREATE INDEX "idx_user_refreshToken" ON "user"("refreshToken");
