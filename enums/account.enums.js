const AccountRole = Object.freeze({
  ROOT: "root",
  ADMIN: "admin",
  STAFF: "staff",
  CUSTOMER: "customer",
});

const AccountStatus = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  BANNED: "banned",
  PENDING: "pending",
  DELETED: "deleted",
});

module.exports = { AccountRole, AccountStatus, CustomerRank };
