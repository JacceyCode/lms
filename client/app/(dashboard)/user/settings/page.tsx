import SharedNotificationSettings from "@/components/SharedNotificationSettings";

const UserSettings = () => {
  return (
    <section className="w-3/5">
      <SharedNotificationSettings
        title="User Settings"
        subtitle="Manage your user notification settings"
      />
    </section>
  );
};

export default UserSettings;
