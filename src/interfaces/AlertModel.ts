export interface AlertModel {
  message: string;
  type: AlertType;
}

interface AlertType {
  type: string;
}

export const SUCCESS_ALERT: AlertType = {
  type: "SUCCESS",
};

export const ERROR_ALERT: AlertType = {
  type: "ERROR",
};

export const WARNING_ALERT: AlertType = {
  type: "INFO",
};
