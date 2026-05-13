export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const showHabitNotification = (habitTitle) => {
  if (Notification.permission === "granted") {
    new Notification("Habit Reminder ⏰", {
      body: `Time to complete: ${habitTitle}`,
      icon: "/vite.svg",
    });
  }
};