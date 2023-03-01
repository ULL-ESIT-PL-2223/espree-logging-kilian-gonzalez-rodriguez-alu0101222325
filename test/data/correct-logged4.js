function mondongo(a, b, c) {
  console.log(`Entering mondongo(${ a }, ${ b }, ${ c }) at line 1`);
  var x = 'ALgo';
  var y = function () {
      console.log(`Entering <anonymous function>() at line 3`);
      return 3;
  }();
  let z = (e => {
      console.log(`Entering <anonymous function>(${ e }) at line 6`);
      return e + 1;
  })(4);
  console.log(x, y, z, y * z);
  var k = function (x, y, z) {
      console.log(`Entering <anonymous function>(${ x }, ${ y }, ${ z }) at line 8`);
      y = y * 2;
      return z * y * x;
  }(a, b, c);
  console.log(k);
}
mondongo(1, 2, 3);