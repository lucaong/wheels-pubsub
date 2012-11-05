(function( top, factory ) {

  // Export PubSub as
  if ( typeof exports !== "undefined" ) {
    // CommonJS / Node
    var Class = require("wheels-class");
    exports = module.exports = exports.PubSub = factory( Class );
  } else if ( typeof define === "function" && define.amd ) {
    // AMD
    define(["wheels-class"], function( Class ) {
      return factory( Class );
    });
  } else {
    // Browser global
    top.Wheels = top.Wheels || {};
    top.Wheels.PubSub = factory( top.Wheels.Class );
  }

}( this, function( Class ) {

    var PubSub = new Class({

      initialize: function() {
        this._eventListeners = {};
      },

      pub: function( evt ) {
        var args;
        if ( !this._eventListeners[ evt ] ) {
          return false;
        }
        for ( var i = 0, len = this._eventListeners[ evt ].length; i < len; i++ ) {
          args = [ evt ].concat( Array.prototype.slice.call( arguments, 1 ) );
          this._eventListeners[ evt ][ i ].apply( this, args );
        }
        return true;
      },

      sub: function( evt, cbk ) {
        if ( !this._eventListeners[ evt ] ) {
          this._eventListeners[ evt ] = [];
        }
        this._eventListeners[ evt ].push( cbk );
        return this;
      },

      subOnce: function( evt, cbk ) {
        var self = this;
        self.sub( evt, function wrap() {
          self.unsub( evt, wrap );
          cbk.apply( this, arguments );
        });
        return this;
      },

      unsub: function( evt, cbk ) {
        if ( evt ) {
          if ( cbk ) {
            var i = ( this._eventListeners[ evt ] || [] ).indexOf( cbk );
            if ( i < 0 ) {
              return this;
            }
            this._eventListeners[ evt ].splice( i, 1 );
          } else {
            delete this._eventListeners[ evt ];
          }
        } else {
          this._eventListeners = {};
        }
        return this;
      }

    });

    return PubSub;

  })

);