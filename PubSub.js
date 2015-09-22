var publisher = {};

var PubSub = {
	sub: function(key){
		var data;

		if(!publisher[key]) return;

		data = [].slice.call(arguments, 1);
		publisher[key].forEach(function(fn){
			fn.apply && fn.apply(key, data);
		});
	},
	pub: function(key, cb){
		if(!publisher[key]) publisher[key] = [cb];
		else if(!~publisher[key].indexOf(cb)) publisher[key].push(cb);
	},
	unsub: function(key, fn){
		var at;
		
		if(!publisher[key]) return;

		at = publisher[key].indexOf(fn);
		
		if(~at) publisher[key].splice(at,1);
	},
	clear: function(key){
		if(key) delete publisher[key];
		else publisher = {};
	}
};

module.exports = PubSub;