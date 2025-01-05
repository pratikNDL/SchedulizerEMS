-- CreateTable
CREATE TABLE "_LinkedClasses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConcurrentClasses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LinkedClasses_AB_unique" ON "_LinkedClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_LinkedClasses_B_index" ON "_LinkedClasses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConcurrentClasses_AB_unique" ON "_ConcurrentClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_ConcurrentClasses_B_index" ON "_ConcurrentClasses"("B");

-- AddForeignKey
ALTER TABLE "_LinkedClasses" ADD CONSTRAINT "_LinkedClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LinkedClasses" ADD CONSTRAINT "_LinkedClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConcurrentClasses" ADD CONSTRAINT "_ConcurrentClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConcurrentClasses" ADD CONSTRAINT "_ConcurrentClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
