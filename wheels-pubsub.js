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

    var idxOf = function( ary, elem ) {
      if ( ary.indexOf ) {
        return ary.indexOf( elem );
      } else {
        for ( var i = 0, len = ary.length; i < len; i++ ) {
          if ( elem === ary[ i ] ) {
            return i;
          }
        }
        return -1;
      }
    };

    var PubSub = new Class({

      pub: function( evt ) {
        var args;
        if ( !this._eventListeners || !this._eventListeners[ evt ] ) {
          return false;
        }
        for ( var i = 0, len = this._eventListeners[ evt ].length; i < len; i++ ) {
          args = [ evt ].concat( Array.prototype.slice.call( arguments, 1 ) );
          this._eventListeners[ evt ][ i ].apply( this, args );
        }
        return true;
      },

      sub: function( evt, cbk ) {
        this._eventListeners = this._eventListeners || {};
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
        if ( !this._eventListeners ) {
          return this;
        }
        if ( evt ) {
          if ( cbk ) {
            var i = idxOf( ( this._eventListeners[ evt ] || [] ), cbk );
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