let Mock = require('mockjs');
// Mock.mock(rurl, template)
Mock.mock(/\.json/, {
    'list|1-10': [{
        'id|+1': 1,
        'email': '@EMAIL'
    }]
});
$.ajax({
    url: 'hello.json',
    dataType: 'json'
}).done(function(data, status, jqXHR){
    console.log( data );
});