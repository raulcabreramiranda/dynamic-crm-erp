'use strict';
const AdminAuditEntity = require('./columns/admin-audit-entity');
const AdminAuthority = require('./columns/admin-authority');
const AdminPermission = require('./columns/admin-permission');
const AdminPermissionProfile = require('./columns/admin-permission-profile');
const AdminPermissionUser = require('./columns/admin-permission-user');
const AdminProfile = require('./columns/admin-profile');
const AdminUser = require('./columns/admin-user');
const AdminWhiteLabel = require('./columns/admin-white-label');
const Company = require('./columns/company');
const Customer = require('./columns/customer');
const Patient = require('./columns/patient');
const Photo = require('./columns/photo');
const Professional = require('./columns/professional');
const Subsidiary = require('./columns/subsidiary');
// nedle-add-entity-module-to-main-import - Will import entity modules here, do not remove

const columns = {
  ...AdminAuditEntity.default,
  ...AdminAuthority.default,
  ...AdminPermission.default,
  ...AdminPermissionProfile.default,
  ...AdminPermissionUser.default,
  ...AdminProfile.default,
  ...AdminUser.default,
  ...AdminWhiteLabel.default,
  ...Company.default,
  ...Customer.default,
  ...Patient.default,
  ...Photo.default,
  ...Professional.default,
  ...Subsidiary.default,
  // needle-add-entity-module-to-main - Will add entity modules here, do not remove
};

exports['default'] = columns;
