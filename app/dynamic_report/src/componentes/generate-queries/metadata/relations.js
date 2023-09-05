"use strict";
const AdminAuditEntity = require('./relations/admin-audit-entity');
const AdminAuthority = require('./relations/admin-authority');
const AdminPermission = require('./relations/admin-permission');
const AdminPermissionProfile = require('./relations/admin-permission-profile');
const AdminPermissionUser = require('./relations/admin-permission-user');
const AdminProfile = require('./relations/admin-profile');
const AdminUser = require('./relations/admin-user');
const AdminWhiteLabel = require('./relations/admin-white-label');
const Company = require('./relations/company');
const Customer = require('./relations/customer');
const Patient = require('./relations/patient');
const Photo = require('./relations/photo');
const Professional = require('./relations/professional');
const Subsidiary = require('./relations/subsidiary');
// nedle-add-entity-module-to-main-import - Will import entity modules here, do not remove

const columns = [
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
];

exports["default"] = columns;
