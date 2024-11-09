-- CreateTable
CREATE TABLE "_ScheduleToStudentGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToStudentGroup_AB_unique" ON "_ScheduleToStudentGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToStudentGroup_B_index" ON "_ScheduleToStudentGroup"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToStudentGroup" ADD CONSTRAINT "_ScheduleToStudentGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToStudentGroup" ADD CONSTRAINT "_ScheduleToStudentGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
