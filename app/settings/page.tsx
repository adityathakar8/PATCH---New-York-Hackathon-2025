import { ConsoleNavigation } from "@/components/console-navigation"
import { SettingsHeader } from "@/components/settings-header"
import { SettingsTabs } from "@/components/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <ConsoleNavigation />
      <SettingsHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SettingsTabs />
      </div>
    </div>
  )
}
