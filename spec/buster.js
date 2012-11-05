var config = module.exports;

config["Node tests"] = {
	rootPath: "../",
	environment: "node",
	tests: ["spec/*spec.js"]
};

config["Tests with Require JS"] = {
	rootPath: "../",
	environment: "browser",
	libs:  ["spec/lib/require.js"],
	sources: ["spec/lib/wheels-class.js", "wheels-pubsub.js"],
	tests: ["spec/*.spec.js"],
	extensions: [require("buster-amd")]
};