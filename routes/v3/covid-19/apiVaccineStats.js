// eslint-disable-next-line new-cap
const router = require('express').Router();
const { redis, keys } = require('../../instances');
const _ = require('underscore');
const { response } = require('express');

router.get('/v3/covid-19/vaccineStats', async (req, res) => {
	const data = JSON.parse(await redis.get(keys.vaccine));
	if (data) {
		const temp = _.countBy(data.data, 'trialPhase');
		const struct = Object.keys(temp).map((key) => ({
			phase: key,
			candidates: temp[key]
		}));
		var responseData = {};
		responseData.totalCandidates = _.size(data.data);
		responseData.phases = struct;
		res.send(responseData);
	} else {
		res.status(404).send({ message: `Error fetching vaccine stats` });
	}
});

module.exports = router;
