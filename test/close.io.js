var Closeio = require('../lib/close.io.js');
var config = require('../config.json');
var assert = require('assert')

function randomString() {
    return Math.floor(Math.random() * 10000).toString();
}

describe('Close.io API', function() {
  it('should create, read, updated, delete and search for leads.', function(done) {
    var closeio = new Closeio(config.api_key);
    closeio.lead.create({name: "John Wehr"}).then(function(data){
      return closeio.lead.read(data.id);
    }).then(function(data){
      return closeio.lead.update(data.id, {name: "John Wehr 2"});
    }).then(function(data){
      return closeio.lead.delete(data.id);
    }).then(function(data){
      return closeio.lead.search({name:"Wayne"});
    }).then(function(data){
      done();
    }, function(){
      throw Error(err.error);
    });
  });

  it('should throw a verbose error', function(done) {
    var closeio = new Closeio(config.api_key);
    closeio.lead.create({contacts:[{emails:[{email:"test@example.com"}]}]}).then(function(data){
    }).then(function(data){
    }, function(err){
      done();
    });
  });

  it('should create, read, update, delete lead statuses', function(done) {
    var closeio = new Closeio(config.api_key);
    var randomVal = randomString(); // for confirming update
    closeio.lead_status.create({label: randomString()}).then(function(data) {
      return closeio.lead_status.read(data.id);
    }).then(function(data) {
      return closeio.lead_status.update(data.id, {label: randomVal});
    }).then(function(data) {
      assert(data.label == randomVal)
      return closeio.lead_status.delete(data.id);
    }).then(function(data) {
      return done();
    }, function(err) {
      throw Error(err.error);
    });
  });

  it('should create, read, update, delete opportunity statuses', function(done) {
    var closeio = new Closeio(config.api_key);
    var randomVal = randomString(); // for confirming update
    closeio.opportunity_status.create({label: randomString()}).then(function(data) {
      return closeio.opportunity_status.read(data.id);
    }).then(function(data) {
      return closeio.opportunity_status.update(data.id, {label: randomVal});
    }).then(function(data) {
      assert(data.label == randomVal)
      return closeio.opportunity_status.delete(data.id);
    }).then(function(data) {
      return done();
    }, function(err) {
      throw Error(err.error);
    });
  });
});
