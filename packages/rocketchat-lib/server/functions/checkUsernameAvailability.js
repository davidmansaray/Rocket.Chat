import _ from 'underscore';
import s from 'underscore.string';

RocketChat.checkUsernameAvailability = function(username) {
	const value = RocketChat.settings.get('Accounts_BlockedUsernameList').trim();

	if(value.length === 0) {
		return true;
	}

	const usernameBlackList = _.map(value.split(','), function(username) {
		return username.trim();
	});
	if (usernameBlackList.length !== 0) {
		if (usernameBlackList.every(restrictedUsername => {
			const regex = new RegExp(`^${ s.escapeRegExp(restrictedUsername) }$`, 'i');
			return !regex.test(s.trim(s.escapeRegExp(username)));
		})) {
			return !Meteor.users.findOne({
				username: {
					$regex: new RegExp(`^${ s.trim(s.escapeRegExp(username)) }$`, 'i')
				}
			});
		}
	}
	return false;
};
