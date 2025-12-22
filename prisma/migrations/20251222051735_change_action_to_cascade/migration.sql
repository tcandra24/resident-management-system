-- DropForeignKey
ALTER TABLE "families" DROP CONSTRAINT "families_house_id_fkey";

-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_resident_id_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_family_id_fkey";

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;
