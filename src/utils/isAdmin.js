const isAdmin = mention => process.env.SLACK_ADMINS.split(',').indexOf(mention) > -1;

module.exports = isAdmin;
