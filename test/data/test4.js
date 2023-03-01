function mondongo(a, b, c) {   
  var x = 'ALgo';   
  var y = (function () {
    return 3;
  })();
  let z = (e => { return e +1 })(4);
  console.log(x,y,z , y*z );
  var k = (function (x,y,z) {
    y = y *2;
    return (z*y*x)
  })(a,b,c); 
  console.log(k);
}     
mondongo(1, 2, 3);