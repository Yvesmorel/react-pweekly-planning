import { StyleType } from "../definitions";

export const theadTrStyle: StyleType = {
  color: "#0f5173",
  fontWeight: "300",
  position: "sticky",
  top: -1,
};

export const groupTdStyle: StyleType = {
  height: "auto",
  width: "150px",
};

export const groupContainerStyle: StyleType = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem", // Correspond à gap-3
  padding: "0.75rem", // Correspond à p-3
  color: "#0f5173",
  cursor: "pointer",
};
