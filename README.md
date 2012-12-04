Wheels PubSub
=============

Simple and lightweight PubSub, fully compatible with CommonJS (Node), AMD and standard browser script tag include.


Install
=======

`wheels-pubsub` can be included in a project with CommonJS / npm, AMD or standard browser script tag. Its only dependency is `wheels-class`.

**npm**

```shell
npm install wheels-pubsub
```

**AMD / RequireJS**

```javascript
// Remember to provide the dependency `wheels-class`
require(["wheels-pubsub"], function( PubSub ) {
	var ps = new PubSub();
});
```

**Traditional browser script tag**

```html
<script type="text/javascript" src="path/to/wheels-class.js"></script>
<script type="text/javascript" src="path/to/wheels-pubsub.js"></script>
<script type="text/javascript">
	var ps = new Wheels.PubSub();
</script>
```


Usage
-----

```javascript
var ps = new PubSub();

var cbk = function( evt ) {
	console.log("Event " + evt + " was triggered!");
};

// Subscribe to an event:
ps.on("foo", cbk);

// emit event:
ps.emit("foo"); // Console will log "Event foo was triggered!"

// Pass other arguments when emitting event:
ps.on("bar", function( evt, arg1, arg2 ) {
	console.log( "Received event " + evt + "with args " + arg1 + " and " + arg2 );
});
ps.emit("bar", 123, "abc"); // Console will log "Received event bar with arguments 123 and abc"

// Unsubscribe:
ps.off("foo", cbk); // Unsubscribe `cbk` from event "foo"
ps.off("foo");      // Unsubscribe any callback from event foo
ps.off();           // Unsubscribe any callback from any event

// Subscribe to an event only once:
ps.once("foo", cbk);
ps.emit("foo"); // Console will log "Event foo was triggered!"
ps.emit("foo"); // Console won't log anything
```
