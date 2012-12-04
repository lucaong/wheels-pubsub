var config = module.exports;

config["Browser tests"] = {
	rootPath: "../",
	environment: "browser",
	libs: ["node_modules/wheels-class/wheels-class.js"],
	sources: ["wheels-pubsub.js"],
	tests: ["spec/*.spec.js"]
}