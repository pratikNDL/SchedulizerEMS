-- CreateTable
CREATE TABLE "StudentGroupConstraints" (
    "id" TEXT NOT NULL,
    "studentGroupId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "constraints" INTEGER[],

    CONSTRAINT "StudentGroupConstraints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentGroupConstraints" ADD CONSTRAINT "StudentGroupConstraints_studentGroupId_fkey" FOREIGN KEY ("studentGroupId") REFERENCES "StudentGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGroupConstraints" ADD CONSTRAINT "StudentGroupConstraints_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
