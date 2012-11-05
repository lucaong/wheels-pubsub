Wheels PubSub
=============

Simple and lightweight PubSub, fully compatible with CommonJS (Node), AMD and standard browser script tag include.


Usage
-----

```javascript
var ps = new PubSub();

var cbk = function( evt ) {
	console.log("Event " + evt + " was triggered!");
};

// Subscribe to an event:
ps.sub("foo", cbk);

// Publish event:
ps.pub("foo"); // Console will log "Event foo was triggered!"

// Pass other arguments when publishing event:
ps.sub("bar", function( evt, arg1, arg2 ) {
	console.log( "Received event " + evt + "with args " + arg1 + " and " + arg2 );
});
ps.pub("bar", 123, "abc"); // Console will log "Received event bar with arguments 123 and abc"

// Unsubscribe:
ps.unsub("foo", cbk); // Unsubscribe `cbk` from event "foo"
ps.unsub("foo");      // Unsubscribe any callback from event foo
ps.unsub();           // Unsubscribe any callback from any event

// Subscribe to an event only once:
ps.subOnce("foo", cbk);
ps.pub("foo"); // Console will log "Event foo was triggered!"
ps.pub("foo"); // Console won't log anything
```