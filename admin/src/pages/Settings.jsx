import { useState } from "react";
import { Check, ChevronRight, Save, SlidersHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import { initialSettings } from "../utils/settings/initialSettings";
import SectionHeading from "../components/SectionHeading";
import { Field, SettingRow } from "../components/SettingsComponents";
import navigation from "../utils/settings/navigation";
import { updateSetting } from "../services/SettingsServices";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [settings, setSettings] = useState(initialSettings);

  const handleSave = () => {
    // Frontend preview only. Connect this to your API later.
    toast.info("Settings are ready. Backend persistence will be added next.");
  };

  const renderEmailSettings = () => (
    <>
      <SectionHeading
        title="Email & Notifications"
        description="Control how Jack Merchants Imports communicates with clients and administrators."
      />
      <div className="divide-y divide-gray-100">
        <SettingRow
          title="Query confirmation emails"
          description="Send a confirmation when a client submits a vehicle import request."
          checked={settings.emails.queryConfirmation}
          onChange={(v) =>
            updateSetting(setSettings, "emails", "queryConfirmation", v)
          }
        />

        <SettingRow
          title="Query status updates"
          description="Notify clients when their query status changes."
          checked={settings.emails.statusUpdates}
          onChange={(v) =>
            updateSetting(setSettings, "emails", "statusUpdates", v)
          }
        />

        <SettingRow
          title="Import completion emails"
          description="Notify clients when their vehicle import process is completed."
          checked={settings.emails.importCompletion}
          onChange={(v) =>
            updateSetting(setSettings, "emails", "importCompletion", v)
          }
        />

        <SettingRow
          title="New query alerts"
          description="Notify the administrator when a new client request arrives."
          checked={settings.emails.newQueryAlerts}
          onChange={(v) =>
            updateSetting(setSettings, "emails", "newQueryAlerts", v)
          }
        />

        <SettingRow
          title="Failed email alerts"
          description="Notify the administrator when an email fails to send."
          checked={settings.emails.failedEmailAlerts}
          onChange={(v) =>
            updateSetting(setSettings, "emails", "failedEmailAlerts", v)
          }
        />
      </div>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Default email signature
        </h3>
        <textarea
          value={settings.business.signature}
          onChange={(e) =>
            updateSetting(setSettings, "business", "signature", e.target.value)
          }
          rows={4}
          className="w-full resize-y rounded-lg border border-gray-200 px-3.5 py-3 text-sm leading-6 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
        <p className="mt-2 text-xs text-gray-400">
          This signature can be appended to outgoing email templates.
        </p>
      </div>
    </>
  );

  const renderQuerySettings = () => (
    <>
      <SectionHeading
        title="Query Management"
        description="Set defaults and follow-up preferences for client enquiries."
      />

      <div className="space-y-6">
        <div className="border-t border-gray-100 pt-2">
          <SettingRow
            title="Follow-up reminders"
            description="Enable reminders for queries that have not been followed up."
            checked={settings.queries.followUpReminders}
            onChange={(v) =>
              updateSetting(setSettings, "queries", "followUpReminders", v)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Follow-up interval
          </label>
          <select
            value={settings.queries.followUpDays}
            onChange={(e) =>
              updateSetting(
                setSettings,
                "queries",
                "followUpDays",
                Number(e.target.value),
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-red-500 sm:max-w-sm"
          >
            <option value={1}>After 1 day</option>
            <option value={3}>After 3 days</option>
            <option value={5}>After 5 days</option>
            <option value={7}>After 7 days</option>
          </select>
          <p className="mt-2 text-xs text-gray-500">
            This preference will only take effect when reminders are
            implemented.
          </p>
        </div>

        <div className="border-t border-gray-100 pt-2">
          <SettingRow
            title="Require cancellation reason"
            description="Require an explanation before an admin cancels a query."
            checked={settings.queries.requireCancellationReason}
            onChange={(v) =>
              updateSetting("queries", "requireCancellationReason", v)
            }
          />
        </div>
      </div>
    </>
  );

  const renderBusinessSettings = () => (
    <>
      <SectionHeading
        title="Business Profile"
        description="Manage the contact information used across your admin communications."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Business name"
          value={settings.business.name}
          onChange={(v) => updateSetting("business", "name", v)}
          placeholder="Business name"
        />
        <Field
          label="Contact email"
          type="email"
          value={settings.business.contactEmail}
          onChange={(v) => updateSetting("business", "contactEmail", v)}
          placeholder="info@yourdomain.com"
        />
        <Field
          label="Phone number"
          value={settings.business.phone}
          onChange={(v) => updateSetting("business", "phone", v)}
          placeholder="+254 7XX XXX XXX"
        />
        <Field
          label="WhatsApp number"
          value={settings.business.whatsapp}
          onChange={(v) => updateSetting("business", "whatsapp", v)}
          placeholder="+254 7XX XXX XXX"
        />
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600">
        These are business contact details, not email-provider credentials. Your
        Resend API key will remain in backend environment variables.
      </div>
    </>
  );

  const content = {
    email: renderEmailSettings,
    queries: renderQuerySettings,
    business: renderBusinessSettings,
  };

  const activeItem = navigation.find((item) => item.id === activeTab);
  const ActiveIcon = activeItem.icon;

  return (
    <div className="min-h-full bg-gray-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SlidersHorizontal className="h-4 w-4" />
              Administration
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-800">Settings</span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Manage your business preferences and administrative controls.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>

        {/* Main settings layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Preferences
            </p>

            <nav className="flex gap-1 overflow-x-auto lg:flex-col">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition lg:w-full ${
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span>{item.label}</span>
                    {isActive && (
                      <ChevronRight className="ml-auto hidden h-4 w-4 lg:block" />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Settings content */}
          <main className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="rounded-lg bg-red-50 p-2.5">
                <ActiveIcon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{activeItem.label}</h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Jack Merchants Imports administration
                </p>
              </div>
            </div>

            {content[activeTab]()}
          </main>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Jack Merchants Imports · Admin Settings
        </p>
      </div>
    </div>
  );
};

export default Settings;
