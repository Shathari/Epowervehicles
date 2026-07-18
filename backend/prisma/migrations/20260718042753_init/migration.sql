-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "specLine" TEXT,
    "rangeText" TEXT,
    "capacityText" TEXT,
    "chargeTimeText" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL,
    "vehiclesSold" INTEGER NOT NULL DEFAULT 0,
    "dealersCount" INTEGER NOT NULL DEFAULT 0,
    "statesCovered" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL DEFAULT '',
    "heroSubtitle" TEXT NOT NULL DEFAULT '',
    "companyIntro" TEXT NOT NULL DEFAULT '',
    "missionText" TEXT NOT NULL DEFAULT '',
    "visionText" TEXT NOT NULL DEFAULT '',
    "coreValues" TEXT NOT NULL DEFAULT '[]',
    "servicesIntro" TEXT NOT NULL DEFAULT '',
    "services" TEXT NOT NULL DEFAULT '[]',
    "environmentalImpact" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealershipApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DealershipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unread',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesPartnerApplication" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "previousCompany" TEXT,
    "aboutYourself" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesPartnerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
