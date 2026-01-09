-- CreateTable
CREATE TABLE "User" (
    "publicId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenanteId" TEXT,
    "lastName" TEXT,
    "firstName" TEXT NOT NULL,
    "taxId" TEXT,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "authEmail" TEXT NOT NULL,
    "userStatus" TEXT DEFAULT 'ACTIVE',
    "statusNotes" TEXT DEFAULT '',
    "authPhone" TEXT,
    "emailConfirmedAt" DATETIME,
    "phoneConfirmedAt" DATETIME,
    "authUserId" TEXT,
    "docs" TEXT
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT,
    "permissions" TEXT NOT NULL,
    "staffSince" DATETIME
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "permissions" TEXT,
    "customerSince" DATETIME
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "employeeId" TEXT,
    "customerId" TEXT,
    CONSTRAINT "UserType_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserType_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "Coupons" TEXT,
    "totalDiscount" DECIMAL,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" TEXT NOT NULL,
    "totalDiscount" DECIMAL NOT NULL,
    CONSTRAINT "CartItem_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "documentCode" TEXT,
    "documentType" TEXT,
    "website" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CompanyAddress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "region" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT,
    "latitudeLongitude" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "CompanyAddress_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyPhone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contryCode" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'GENERAL',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "CompanyPhone_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyEmail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'GENERAL',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "CompanyEmail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discountYype" TEXT NOT NULL,
    "discountPercentage" INTEGER,
    "discountValue" DECIMAL,
    "usageLimit" INTEGER,
    "perUserLimit" INTEGER,
    "minimumOrderValue" DECIMAL NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publicatedAt" DATETIME,
    "companyId" TEXT NOT NULL,
    "information" TEXT NOT NULL DEFAULT '',
    "includes" TEXT NOT NULL DEFAULT '{}',
    "notIncludes" TEXT NOT NULL DEFAULT '{}',
    "itinerary" TEXT DEFAULT '{}',
    "rules" TEXT NOT NULL DEFAULT '{}',
    "notes" TEXT,
    "daysAndTimes" TEXT DEFAULT '{}',
    "prices" TEXT NOT NULL DEFAULT '{}',
    "availableTickets" INTEGER NOT NULL DEFAULT 0,
    "maxPerUser" INTEGER NOT NULL DEFAULT 1,
    "minPerUser" INTEGER NOT NULL DEFAULT 1,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "imgList" TEXT DEFAULT '[]',
    "locations" TEXT DEFAULT '[]',
    "achievements" TEXT DEFAULT '[]',
    CONSTRAINT "Experience_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperienceAddress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "region" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "experienceId" TEXT NOT NULL,
    CONSTRAINT "ExperienceAddress_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience_img" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "description" TEXT,
    "position" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experienceId" TEXT NOT NULL,
    CONSTRAINT "Experience_img_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "added_at" DATETIME NOT NULL,
    "experienceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Favorite_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderCharge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "cartId" TEXT,
    CONSTRAINT "OrderCharge_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderCharge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderChargeId" TEXT NOT NULL,
    CONSTRAINT "Payment_orderChargeId_fkey" FOREIGN KEY ("orderChargeId") REFERENCES "OrderCharge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "fullName" TEXT,
    "birthDate" TEXT,
    "isPersonWithDisability" BOOLEAN,
    "additionalInfo" TEXT,
    "documentType" TEXT,
    "documentCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentUrl" TEXT,
    "personPhoneId" TEXT
);

-- CreateTable
CREATE TABLE "PersonPhone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contry" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,
    CONSTRAINT "PersonPhone_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PurchasedExperience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experienceId" TEXT,
    "userId" TEXT,
    CONSTRAINT "PurchasedExperience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PurchasedExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PurchasedTicket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isForPersonWithDisability" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "userId" TEXT,
    "personId" TEXT,
    "purchasedExperienceId" TEXT NOT NULL,
    "experienceId" TEXT,
    CONSTRAINT "PurchasedTicket_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PurchasedTicket_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PurchasedTicket_purchasedExperienceId_fkey" FOREIGN KEY ("purchasedExperienceId") REFERENCES "PurchasedExperience" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PurchasedTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Refound" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reason" TEXT NOT NULL,
    "type" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT NOT NULL,
    CONSTRAINT "Refound_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MarketingCampaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "channels" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "budget" DECIMAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Inflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "type" TEXT,
    "status" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT NOT NULL,
    CONSTRAINT "Inflow_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "docs" TEXT NOT NULL,
    "businessAddress" TEXT,
    "businessEmail" TEXT,
    "businessPhone" TEXT,
    "operatingHours" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contry" TEXT,
    "idiom" TEXT,
    "currency" TEXT
);

-- CreateTable
CREATE TABLE "AccountSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "smsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "newsletter" BOOLEAN NOT NULL DEFAULT true,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL DEFAULT 'en',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "deactivateAccount" BOOLEAN NOT NULL DEFAULT false,
    "deleteRequested" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AccountSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BusinessSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "legalName" TEXT,
    "taxId" TEXT,
    "industry" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "street" TEXT,
    "number" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT,
    "taxRegime" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GrowUp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestDate" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsible" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Outflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "type" TEXT,
    "status" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT NOT NULL,
    CONSTRAINT "Outflow_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "purchasedExperienceId" TEXT NOT NULL,
    CONSTRAINT "Review_purchasedExperienceId_fkey" FOREIGN KEY ("purchasedExperienceId") REFERENCES "PurchasedExperience" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SuportTicket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "SuportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserEmail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alternativeEmail" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserPhone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contry" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserPhone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TicketForSale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isForPersonWithDisability" BOOLEAN NOT NULL DEFAULT true,
    "type" TEXT DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experienceId" TEXT NOT NULL,
    CONSTRAINT "TicketForSale_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "taxId" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT
);

-- CreateTable
CREATE TABLE "ActionTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VolumeCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "volumeCategoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inventory_volumeCategoryId_fkey" FOREIGN KEY ("volumeCategoryId") REFERENCES "VolumeCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GatewayCharge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "rawResponse" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_CartToCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CartToCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CartToCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "Coupon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CartItemToCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CartItemToCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "CartItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CartItemToCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "Coupon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CouponToPurchasedTicket" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CouponToPurchasedTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CouponToPurchasedTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "PurchasedTicket" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_taxId_key" ON "User"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "User_authEmail_key" ON "User"("authEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_authUserId_key" ON "User"("authUserId");

-- CreateIndex
CREATE INDEX "User_publicId_idx" ON "User"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_userId_key" ON "UserType"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_employeeId_key" ON "UserType"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_customerId_key" ON "UserType"("customerId");

-- CreateIndex
CREATE INDEX "UserType_userId_idx" ON "UserType"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_userId_customerId_employeeId_key" ON "UserType"("userId", "customerId", "employeeId");

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "CartItem_cardId_idx" ON "CartItem"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_nickName_key" ON "Company"("nickName");

-- CreateIndex
CREATE INDEX "Company_id_nickName_idx" ON "Company"("id", "nickName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_documentCode_documentType_key" ON "Company"("documentCode", "documentType");

-- CreateIndex
CREATE INDEX "CompanyAddress_companyId_idx" ON "CompanyAddress"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPhone_number_key" ON "CompanyPhone"("number");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPhone_type_key" ON "CompanyPhone"("type");

-- CreateIndex
CREATE INDEX "CompanyPhone_companyId_idx" ON "CompanyPhone"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyEmail_email_key" ON "CompanyEmail"("email");

-- CreateIndex
CREATE INDEX "CompanyEmail_companyId_idx" ON "CompanyEmail"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- CreateIndex
CREATE INDEX "Experience_slug_idx" ON "Experience"("slug");

-- CreateIndex
CREATE INDEX "Experience_companyId_idx" ON "Experience"("companyId");

-- CreateIndex
CREATE INDEX "ExperienceAddress_experienceId_idx" ON "ExperienceAddress"("experienceId");

-- CreateIndex
CREATE INDEX "Experience_img_experienceId_idx" ON "Experience_img"("experienceId");

-- CreateIndex
CREATE INDEX "Favorite_experienceId_idx" ON "Favorite"("experienceId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_key" ON "Favorite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderCharge_code_key" ON "OrderCharge"("code");

-- CreateIndex
CREATE INDEX "OrderCharge_cartId_idx" ON "OrderCharge"("cartId");

-- CreateIndex
CREATE INDEX "OrderCharge_createdAt_idx" ON "OrderCharge"("createdAt");

-- CreateIndex
CREATE INDEX "OrderCharge_userId_idx" ON "OrderCharge"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderCharge_createdAt_userId_cartId_key" ON "OrderCharge"("createdAt", "userId", "cartId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_publicId_key" ON "Payment"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_code_key" ON "Payment"("code");

-- CreateIndex
CREATE INDEX "Payment_orderChargeId_idx" ON "Payment"("orderChargeId");

-- CreateIndex
CREATE INDEX "Payment_publicId_idx" ON "Payment"("publicId");

-- CreateIndex
CREATE INDEX "Payment_code_idx" ON "Payment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Person_publicId_key" ON "Person"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_code_key" ON "Person"("code");

-- CreateIndex
CREATE INDEX "Person_personPhoneId_idx" ON "Person"("personPhoneId");

-- CreateIndex
CREATE INDEX "Person_documentType_idx" ON "Person"("documentType");

-- CreateIndex
CREATE INDEX "Person_documentCode_idx" ON "Person"("documentCode");

-- CreateIndex
CREATE UNIQUE INDEX "Person_documentType_documentCode_key" ON "Person"("documentType", "documentCode");

-- CreateIndex
CREATE UNIQUE INDEX "PersonPhone_personId_key" ON "PersonPhone"("personId");

-- CreateIndex
CREATE INDEX "PersonPhone_personId_idx" ON "PersonPhone"("personId");

-- CreateIndex
CREATE INDEX "PurchasedExperience_experienceId_idx" ON "PurchasedExperience"("experienceId");

-- CreateIndex
CREATE INDEX "PurchasedExperience_userId_idx" ON "PurchasedExperience"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedTicket_publicId_key" ON "PurchasedTicket"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedTicket_code_key" ON "PurchasedTicket"("code");

-- CreateIndex
CREATE INDEX "PurchasedTicket_publicId_idx" ON "PurchasedTicket"("publicId");

-- CreateIndex
CREATE INDEX "PurchasedTicket_code_idx" ON "PurchasedTicket"("code");

-- CreateIndex
CREATE INDEX "PurchasedTicket_userId_idx" ON "PurchasedTicket"("userId");

-- CreateIndex
CREATE INDEX "PurchasedTicket_experienceId_idx" ON "PurchasedTicket"("experienceId");

-- CreateIndex
CREATE INDEX "Refound_paymentId_idx" ON "Refound"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Inflow_paymentId_key" ON "Inflow"("paymentId");

-- CreateIndex
CREATE INDEX "Inflow_paymentId_idx" ON "Inflow"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_businessName_key" ON "Setting"("businessName");

-- CreateIndex
CREATE UNIQUE INDEX "AccountSettings_userId_key" ON "AccountSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Outflow_paymentId_key" ON "Outflow"("paymentId");

-- CreateIndex
CREATE INDEX "Outflow_paymentId_idx" ON "Outflow"("paymentId");

-- CreateIndex
CREATE INDEX "Review_purchasedExperienceId_idx" ON "Review"("purchasedExperienceId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_purchasedExperienceId_key" ON "Review"("userId", "purchasedExperienceId");

-- CreateIndex
CREATE INDEX "SuportTicket_userId_idx" ON "SuportTicket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_id_key" ON "UserEmail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_alternativeEmail_key" ON "UserEmail"("alternativeEmail");

-- CreateIndex
CREATE INDEX "UserEmail_userId_idx" ON "UserEmail"("userId");

-- CreateIndex
CREATE INDEX "UserPhone_userId_idx" ON "UserPhone"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhone_userId_contry_area_number_key" ON "UserPhone"("userId", "contry", "area", "number");

-- CreateIndex
CREATE INDEX "TicketForSale_experienceId_idx" ON "TicketForSale"("experienceId");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_taxId_key" ON "Supplier"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VolumeCategory_name_key" ON "VolumeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToCoupon_AB_unique" ON "_CartToCoupon"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToCoupon_B_index" ON "_CartToCoupon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartItemToCoupon_AB_unique" ON "_CartItemToCoupon"("A", "B");

-- CreateIndex
CREATE INDEX "_CartItemToCoupon_B_index" ON "_CartItemToCoupon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToPurchasedTicket_AB_unique" ON "_CouponToPurchasedTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToPurchasedTicket_B_index" ON "_CouponToPurchasedTicket"("B");
