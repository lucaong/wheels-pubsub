/* Setup tests */
if ( typeof define !== "undefined" && define.amd ) {
	// AMD
	buster.spec.expose();

	require.config({
		paths: {
			"wheels-pubsub": "./wheels-pubsub",
			"wheels-class": "node_modules/wheels-class/wheels-class"
		}
	});

	describe("When required with AMD", function( run ) {
		require( ["wheels-pubsub"], function( PubSub ) {
			run( function() {
				runTests.call( this, PubSub );
			});
		});
	});
} else if ( typeof require !== "undefined" ) {
	// CommonJS / Node
	var buster = require("buster"),
			PubSub = require("../wheels-pubsub");
	runTests( PubSub );
} else {
	// Browser global
	runTests( Wheels.PubSub );
}


function runTests( PubSub ) {

	buster.spec.expose();

	describe("PubSub", function() {

		before(function() {
			this.pubsub = new PubSub();
		});

		describe("sub", function() {
			
			it("adds the callback to the list of listener for the specified event", function() {
				var cbk = function() {};
				this.pubsub.sub( "foo", cbk );
				expect( this.pubsub._eventListeners.foo[ this.pubsub._eventListeners.foo.length - 1 ] ).toBe( cbk );
			});

		});

		describe("pub", function() {
			
			it("executes all the callbacks that subscribed for the specified event", function() {
				var cbk1 = this.spy(),
						cbk2 = this.spy();
				this.pubsub.sub( "foo", cbk1 );
				this.pubsub.sub( "foo", cbk2 );
				this.pubsub.pub("foo");
				expect( cbk1 ).toHaveBeenCalledOnce();
				expect( cbk2 ).toHaveBeenCalledOnce();
			});

			it("does not execute callbacks that subscribed for other events", function() {
				var cbk = this.spy();
				this.pubsub.sub( "foo", cbk );
				this.pubsub.pub("bar");
				refute.called( cbk );
			});

			it("executes the callbacks that subscribed for the specified event passing the event name and other arguments", function() {
				var cbk = this.spy();
				this.pubsub.sub( "foo", cbk );
				this.pubsub.pub("foo", 123 );
				expect( cbk ).toHaveBeenCalledWith( "foo", 123 );
			});

			it("returns false if no event listener is set for the specified event", function() {
				expect( this.pubsub.pub("foo") ).toEqual( false );
			});

			it("returns true if at least one event listener is set for the specified event", function() {
				this.pubsub.sub( "foo", function() {} );
				expect( this.pubsub.pub("foo") ).toEqual( true );
			});

		});

		describe("unsub", function() {
			
			it("removes the callback to the list of listener for the specified event", function() {
				var cbk = function() {};
				this.pubsub.sub( "bar", cbk );
				this.pubsub.unsub( "bar", cbk );
				expect( this.pubsub._eventListeners.bar.length ).toEqual( 0 );
			});

			it("does not remove other callbacks to the list of listener for the specified event", function() {
				var cbk1 = function() { return true; },
						cbk2 = function() {};
				this.pubsub.sub( "bar", cbk1 );
				this.pubsub.sub( "bar", cbk2 );
				this.pubsub.unsub( "bar", cbk2 );
				expect( this.pubsub._eventListeners.bar[ this.pubsub._eventListeners.bar.length - 1 ] ).toBe( cbk1 );
			});

			it("does not remove callbacks to the list of listener for other events", function() {
				var cbk1 = function() { return true; },
						cbk2 = function() {};
				this.pubsub.sub( "foo", cbk1 );
				this.pubsub.sub( "bar", cbk2 );
				this.pubsub.unsub( "bar", cbk2 );
				expect( this.pubsub._eventListeners.foo.length ).toEqual( 1 );
			});

			it("removes all callbacks to the list of listener for the specified event if no callback is passed", function() {
				var cbk1 = function() { return true; },
						cbk2 = function() {};
				this.pubsub.sub( "bar", cbk1 );
				this.pubsub.sub( "bar", cbk2 );
				this.pubsub.unsub( "bar" );
				expect( typeof this.pubsub._eventListeners.bar ).toEqual("undefined");
			});

			it("removes all callbacks to the list of listener for any event if no argument is passed", function() {
				var cbk1 = function() { return true; },
						cbk2 = function() {};
				this.pubsub.sub( "foo", cbk1 );
				this.pubsub.sub( "bar", cbk2 );
				this.pubsub.unsub();
				expect( typeof this.pubsub._eventListeners.foo ).toEqual("undefined");
				expect( typeof this.pubsub._eventListeners.bar ).toEqual("undefined");
			});

		});

		describe("subOnce", function() {
			
			it("subscribe only once for the specified event", function() {
				var cbk = this.spy();
				this.pubsub.subOnce( "foo", cbk );
				this.pubsub.pub("foo");
				this.pubsub.pub("foo");
				expect( cbk ).toHaveBeenCalledOnce();
			});

		});

	});

}