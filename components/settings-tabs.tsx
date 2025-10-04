"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyProfileTab } from "@/components/company-profile-tab"
import { BillingTab } from "@/components/billing-tab"
import { IntegrationsTab } from "@/components/integrations-tab"
import { ApiKeysTab } from "@/components/api-keys-tab"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="bg-[#111214] border-b border-[#1F2123] w-full justify-start rounded-none h-auto p-0">
        <TabsTrigger
          value="profile"
          className="data-[state=active]:border-b-2 data-[state=active]:border-[#21CE99] data-[state=active]:text-[#EAEAEA] rounded-none px-6 py-3 text-[#C9CDD1]"
        >
          Company Profile
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="data-[state=active]:border-b-2 data-[state=active]:border-[#21CE99] data-[state=active]:text-[#EAEAEA] rounded-none px-6 py-3 text-[#C9CDD1]"
        >
          Billing
        </TabsTrigger>
        <TabsTrigger
          value="integrations"
          className="data-[state=active]:border-b-2 data-[state=active]:border-[#21CE99] data-[state=active]:text-[#EAEAEA] rounded-none px-6 py-3 text-[#C9CDD1]"
        >
          Integrations
        </TabsTrigger>
        <TabsTrigger
          value="api"
          className="data-[state=active]:border-b-2 data-[state=active]:border-[#21CE99] data-[state=active]:text-[#EAEAEA] rounded-none px-6 py-3 text-[#C9CDD1]"
        >
          API Keys
        </TabsTrigger>
      </TabsList>

      <div className="mt-8">
        <TabsContent value="profile">
          <CompanyProfileTab />
        </TabsContent>
        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
        <TabsContent value="api">
          <ApiKeysTab />
        </TabsContent>
      </div>
    </Tabs>
  )
}
