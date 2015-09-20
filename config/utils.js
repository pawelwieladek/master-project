var Utils = {
    extend: function(parentClass, childClass) {
        var C = function() { };
        C.prototype = parentClass.prototype;
        childClass.prototype = new C();
        childClass.prototype.constructor = childClass;
    },
    memoize: function(fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments),
                hash = "",
                i = args.length;
            var currentArg = null;
            while (i--) {
                currentArg = args[i];
                hash += (currentArg === Object(currentArg)) ?
                    JSON.stringify(currentArg) : currentArg;
                fn.memoize || (fn.memoize = {});
            }
            return (hash in fn.memoize) ? fn.memoize[hash] :
                fn.memoize[hash] = fn.apply(this, args);
        };
    }
};

module.exports = Utils;