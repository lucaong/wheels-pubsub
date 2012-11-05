var config = module.exports;

config["Browser tests"] = {
	rootPath: "../",
	environment: "browser",
	libs: ["spec/lib/wheels-class.js"],
	sources: ["wheels-pubsub.js"],
	tests: ["spec/*.spec.js"]
}