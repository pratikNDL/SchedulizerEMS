-- CreateTable
CREATE TABLE "FacultyConstraints" (
    "id" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "constraints" JSONB NOT NULL,

    CONSTRAINT "FacultyConstraints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FacultyConstraints" ADD CONSTRAINT "FacultyConstraints_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyConstraints" ADD CONSTRAINT "FacultyConstraints_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
