import { notifications } from "@mantine/notifications";

export const showNotification = {
  success: (message: string, title?: string) => {
    notifications.show({
      title: title || "Success",
      message,
      color: "green",
      autoClose: 3000,
    });
  },

  error: (message: string, title?: string) => {
    notifications.show({
      title: title || "Error",
      message,
      color: "red",
      autoClose: 5000,
    });
  },

  warning: (message: string, title?: string) => {
    notifications.show({
      title: title || "Warning",
      message,
      color: "yellow",
      autoClose: 4000,
    });
  },

  info: (message: string, title?: string) => {
    notifications.show({
      title: title || "Info",
      message,
      color: "blue",
      autoClose: 3000,
    });
  },
};
