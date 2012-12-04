var config = module.exports;

config["Node tests"] = {
	rootPath: "../",
	environment: "node",
	tests: ["spec/*spec.js"]
};

config["Tests with Require JS"] = {
	rootPath: "../",
	environment: "browser",
	libs:  ["node_modules/requirejs/require.js"],
	sources: ["node_modules/wheels-class/wheels-class.js", "wheels-pubsub.js"],
	tests: ["spec/*.spec.js"],
	extensions: [require("buster-amd")]
};